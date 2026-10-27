# Como subir o site da Trinity Data na VPS

Para quem vai instalar o site em `trinitydata.com.br`. Leva uns 20 minutos.

## O que é o site

São só arquivos estáticos (HTML, CSS, JavaScript e SVG), sem servidor de aplicação e sem banco de dados. Basta um Nginx servindo a pasta.

Os arquivos ficam no ramo `main` de https://github.com/akaviny14/trinitydata-site. O repositório é público, então dá para clonar sem senha. A agência publica as mudanças nesse ramo. A VPS só precisa puxar, e o passo 6 deixa isso automático.

O que vai para o ar:

| Arquivo | O que é |
|---|---|
| `index.html` | A página inicial |
| `empresa.html`, `politica-de-privacidade.html` | As outras páginas, servidas como `/empresa` e `/politica-de-privacidade` |
| `config.js`, `assets/` | Os contatos e os logos |
| `robots.txt`, `sitemap.xml` | Para o Google |

Ficam de fora, e o Nginx responde 404 para eles: `deploy/` (esta pasta), `MUDANCAS-SITE.md`, `vercel.json` e `.vercelignore`. Esses arquivos servem à agência e ao ambiente de teste na Vercel.

## Antes de começar

- **Servidor:** Ubuntu 22.04 ou 24.04, com acesso `sudo` e as portas 80 e 443 abertas no firewall.
- **DNS:** quem cuida do domínio na Hostinger cria dois registros apontando para o IP da VPS:
  - `A`, nome `@` (o próprio `trinitydata.com.br`);
  - `A`, nome `www`.

  Se a VPS tiver IPv6, crie também os dois `AAAA`; se não tiver, não crie nenhum `AAAA`. Apague qualquer registro `A` ou `CNAME` antigo nesses dois nomes, por exemplo a página padrão da Hostinger.
- **Propagação:** confira com `dig +short trinitydata.com.br` e `dig +short www.trinitydata.com.br`. Os dois precisam devolver o IP da VPS antes do passo 3, senão o certificado não sai.

## 1. Instalar o Nginx, o Certbot e o Git

```bash
sudo apt update
sudo apt install -y nginx certbot git
```

## 2. Baixar o site

```bash
sudo git clone https://github.com/akaviny14/trinitydata-site.git /var/www/trinitydata
```

## 3. Tirar o certificado HTTPS (Let's Encrypt)

A configuração definitiva usa o certificado, então ela só entra depois que ele existe. Primeiro, uma configuração provisória, só em HTTP, para o Let's Encrypt validar o domínio:

```bash
sudo mkdir -p /var/www/certbot
sudo tee /etc/nginx/sites-available/trinitydata.conf > /dev/null <<'EOF'
server {
  listen 80;
  listen [::]:80;
  server_name trinitydata.com.br www.trinitydata.com.br;
  location /.well-known/acme-challenge/ { root /var/www/certbot; }
  location / { return 404; }
}
EOF
sudo ln -sf /etc/nginx/sites-available/trinitydata.conf /etc/nginx/sites-enabled/trinitydata.conf
sudo nginx -t && sudo systemctl reload nginx
sudo certbot certonly --webroot -w /var/www/certbot -d trinitydata.com.br -d www.trinitydata.com.br
```

O Certbot pede um e-mail para os avisos de vencimento. Use um que alguém leia.

## 4. Configuração definitiva

```bash
sudo cp /var/www/trinitydata/deploy/nginx-trinitydata.conf /etc/nginx/sites-available/trinitydata.conf
sudo nginx -t && sudo systemctl reload nginx
```

O que essa configuração faz:

- **Endereço oficial:** é `https://trinitydata.com.br`. Quem chega por HTTP ou pelo `www` é redirecionado para ele.
- **Endereços limpos:** `/empresa` serve `empresa.html`, e quem chega por `.html` é redirecionado para o endereço sem a extensão. É o mesmo comportamento da Vercel.
- **Cabeçalhos de segurança:** os mesmos do ambiente de teste (CSP, `nosniff`, `X-Frame-Options`, `Referrer-Policy` e `Permissions-Policy`), mais o HSTS.
- **Indexação:** não tem o `noindex` do ambiente de teste, então o Google pode indexar o site.

**Se a VPS já tiver outros sites:** essa configuração só responde para `trinitydata.com.br` e `www.trinitydata.com.br`, então não mexe nos outros. Se as portas 80 e 443 estiverem com outro programa (Caddy, Traefik, um Nginx dentro de Docker), traga para ele estas partes do arquivo: a pasta raiz, o `try_files`, os redirecionamentos `.html`, os bloqueios de 404 e os cabeçalhos.

## 5. Renovação do certificado

O Certbot já instala a renovação automática. Falta só recarregar o Nginx depois de cada renovação:

```bash
sudo tee /etc/letsencrypt/renewal-hooks/deploy/recarregar-nginx.sh > /dev/null <<'EOF'
#!/bin/sh
systemctl reload nginx
EOF
sudo chmod +x /etc/letsencrypt/renewal-hooks/deploy/recarregar-nginx.sh
sudo certbot renew --dry-run
```

## 6. Atualização automática

A cada 5 minutos, a VPS confere o GitHub e, se houver versão nova, deixa a pasta igual ao ramo `main`. Não é preciso recarregar o Nginx, porque são só arquivos.

```bash
echo '*/5 * * * * root cd /var/www/trinitydata && git fetch -q origin main && git reset -q --hard origin/main' | sudo tee /etc/cron.d/trinitydata-site > /dev/null
```

Ninguém deve editar arquivos direto na VPS: a próxima atualização apaga a mudança. Qualquer ajuste passa pela agência.

## 7. Conferência

```bash
curl -sI https://trinitydata.com.br | head -20             # 200, com Content-Security-Policy e Strict-Transport-Security, sem X-Robots-Tag
curl -sI http://trinitydata.com.br | grep -i location      # 301 para https://trinitydata.com.br/
curl -sI https://www.trinitydata.com.br | grep -i location # 301 para https://trinitydata.com.br/
curl -so /dev/null -w '%{http_code}\n' https://trinitydata.com.br/empresa                  # 200
curl -so /dev/null -w '%{http_code}\n' https://trinitydata.com.br/politica-de-privacidade  # 200
curl -so /dev/null -w '%{http_code}\n' https://trinitydata.com.br/empresa.html             # 301
curl -so /dev/null -w '%{http_code}\n' https://trinitydata.com.br/MUDANCAS-SITE.md         # 404
curl -so /dev/null -w '%{http_code}\n' https://trinitydata.com.br/deploy/LEIA-ME.md        # 404
curl -so /dev/null -w '%{http_code}\n' https://trinitydata.com.br/vercel.json              # 404
curl -s https://trinitydata.com.br/robots.txt                                              # aponta o sitemap
```

Depois, abra o site no celular e no computador e toque num botão do WhatsApp. Ele precisa abrir a conversa com a mensagem pronta.

Ao terminar, avise o Vinicius. A agência confere o site no ar e cadastra o domínio no Google Search Console.

## Se algo der errado

- **`nginx -t` reclama do certificado:** o passo 3 não terminou. Confira o DNS com `dig` e rode o `certbot` de novo.
- **`nginx -t` reclama de `http2`:** o Nginx é de uma versão nova (1.25 ou mais). Troque `listen 443 ssl http2;` por `listen 443 ssl;` e ponha a linha `http2 on;` logo abaixo, nos dois blocos de 443, tanto no IPv4 quanto no IPv6.
- **Ver o que aconteceu:** `sudo tail -n 50 /var/log/nginx/error.log`.
- **Voltar uma versão:** `cd /var/www/trinitydata && sudo git log --oneline -5`, e depois `sudo git reset --hard <commit>`. Desligue o cron do passo 6 enquanto isso, senão ele volta para o `main` em 5 minutos.
