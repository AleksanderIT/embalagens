# Guia de Deploy - ETMA Soluções

## 🚀 Opções de Deploy

### 1. Deploy com Docker (Recomendado)

#### Pré-requisitos
- Docker
- Docker Compose
- Domínio configurado (opcional)

#### Passos

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd ETMA-Solucao
```

2. **Configure as variáveis de ambiente**
```bash
# Copie o arquivo de exemplo
cp backend/env.example backend/.env

# Edite o arquivo .env com suas configurações
nano backend/.env
```

3. **Configure o domínio (opcional)**
Edite o arquivo `nginx.conf` e substitua `localhost` pelo seu domínio.

4. **Execute o deploy**
```bash
# Build e start dos containers
docker-compose up -d

# Verificar logs
docker-compose logs -f

# Parar serviços
docker-compose down
```

5. **Configurar SSL (opcional)**
```bash
# Gerar certificados SSL
mkdir ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ssl/key.pem -out ssl/cert.pem

# Descomente a seção HTTPS no nginx.conf
# Reinicie os containers
docker-compose restart
```

### 2. Deploy Manual

#### Backend

1. **Preparar servidor**
```bash
# Instalar Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

2. **Deploy da aplicação**
```bash
# Clonar repositório
git clone <url-do-repositorio>
cd ETMA-Solucao/backend

# Instalar dependências
npm install --production

# Configurar variáveis de ambiente
cp env.example .env
nano .env

# Criar diretório de uploads
mkdir uploads

# Instalar PM2
npm install -g pm2

# Iniciar aplicação
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

#### Frontend

1. **Build da aplicação**
```bash
cd frontend
npm install
npm run build
```

2. **Configurar servidor web**
```bash
# Instalar Nginx
sudo apt-get install nginx

# Configurar Nginx
sudo nano /etc/nginx/sites-available/etma-solucoes
```

Configuração do Nginx:
```nginx
server {
    listen 80;
    server_name seu-dominio.com;

    root /var/www/etma-solucoes/frontend/build;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /uploads/ {
        proxy_pass http://localhost:5002;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

3. **Ativar configuração**
```bash
sudo ln -s /etc/nginx/sites-available/etma-solucoes /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 3. Deploy em Plataformas Cloud

#### Vercel (Frontend)

1. **Instalar Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
cd frontend
vercel --prod
```

3. **Configurar variáveis de ambiente**
```bash
vercel env add REACT_APP_API_URL
```

#### Heroku (Backend)

1. **Instalar Heroku CLI**
```bash
# macOS
brew tap heroku/brew && brew install heroku

# Ubuntu
sudo snap install heroku --classic
```

2. **Deploy**
```bash
cd backend
heroku create etma-solucoes-api
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=sua_chave_secreta_aqui
heroku config:set MONGODB_URI=sua_uri_mongodb
git push heroku main
```

3. **Configurar MongoDB Atlas**
- Crie uma conta no MongoDB Atlas
- Configure um cluster
- Obtenha a string de conexão
- Configure no Heroku: `heroku config:set MONGODB_URI=sua_uri_atlas`

#### DigitalOcean App Platform

1. **Conectar repositório**
- Acesse DigitalOcean App Platform
- Conecte seu repositório GitHub
- Configure as variáveis de ambiente

2. **Configurar build**
```yaml
# .do/app.yaml
name: etma-solucoes
services:
- name: backend
  source_dir: /backend
  github:
    repo: seu-usuario/etma-solucoes
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
  - key: JWT_SECRET
    value: ${JWT_SECRET}
  - key: MONGODB_URI
    value: ${MONGODB_URI}

- name: frontend
  source_dir: /frontend
  github:
    repo: seu-usuario/etma-solucoes
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: REACT_APP_API_URL
    value: ${BACKEND_URL}
```

### 4. Deploy com CI/CD

#### GitHub Actions

Crie o arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: |
        cd backend
        npm ci
        
    - name: Deploy to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
        heroku_app_name: "etma-solucoes-api"
        heroku_email: ${{ secrets.HEROKU_EMAIL }}
        appdir: "backend"

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: |
        cd frontend
        npm ci
        
    - name: Build
      run: |
        cd frontend
        npm run build
        
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        working-directory: ./frontend
```

## 🔧 Configurações de Produção

### Variáveis de Ambiente

```env
# Produção
NODE_ENV=production
PORT=5002
MONGODB_URI=mongodb://root:root123@localhost:27017/etma?retryWrites=true&w=majority
JWT_SECRET=chave_super_secreta_muito_longa_e_complexa
FRONTEND_URL=https://seu-dominio.com
MAX_FILE_SIZE=10485760
UPLOAD_PATH=uploads
```

# Email (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-de-app
```

### Segurança

1. **Configurar firewall**
```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

2. **Configurar SSL com Let's Encrypt**
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com
```

3. **Configurar backup automático**
```bash
# Criar script de backup
nano /usr/local/bin/backup-etma.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/etma-solucoes"

# Backup do MongoDB
mongodump --uri="mongodb://root:root123@localhost:27017/etma?retryWrites=true&w=majority" --out="$BACKUP_DIR/mongodb_$DATE"

# Backup dos uploads
tar -czf "$BACKUP_DIR/uploads_$DATE.tar.gz" /var/www/etma-solucoes/backend/uploads

# Manter apenas os últimos 7 backups
find $BACKUP_DIR -name "mongodb_*" -mtime +7 -delete
find $BACKUP_DIR -name "uploads_*" -mtime +7 -delete
```

```bash
chmod +x /usr/local/bin/backup-etma.sh

# Adicionar ao crontab
crontab -e
# Adicionar linha: 0 2 * * * /usr/local/bin/backup-etma.sh
```

### Monitoramento

1. **Configurar logs**
```bash
# PM2 logs
pm2 logs etma-backend

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

2. **Configurar monitoramento com PM2**
```bash
pm2 install pm2-server-monit
pm2 install pm2-logrotate
```

3. **Configurar alertas**
```bash
# Instalar uptime monitor
npm install -g uptime-monitor

# Configurar monitoramento
uptime-monitor add https://seu-dominio.com/api/health
```

## 🚨 Troubleshooting

### Problemas Comuns

1. **Erro de conexão com MongoDB**
```bash
# Verificar se o MongoDB está rodando
sudo systemctl status mongod

# Verificar logs
sudo journalctl -u mongod
```

2. **Erro de permissão nos uploads**
```bash
# Corrigir permissões
sudo chown -R www-data:www-data /var/www/etma-solucoes/backend/uploads
sudo chmod -R 755 /var/www/etma-solucoes/backend/uploads
```

3. **Erro de CORS**
- Verificar se a URL do frontend está correta no backend
- Verificar configuração do CORS no nginx

4. **Erro de memória**
```bash
# Aumentar limite de memória do Node.js
export NODE_OPTIONS="--max-old-space-size=2048"
```

### Logs Úteis

```bash
# Backend logs
pm2 logs etma-backend --lines 100

# Nginx logs
sudo tail -f /var/log/nginx/error.log

# MongoDB logs
sudo tail -f /var/log/mongodb/mongod.log

# Docker logs
docker-compose logs -f backend
```

## 📊 Performance

### Otimizações

1. **Configurar cache**
```nginx
# Nginx cache para imagens
location ~* \.(jpg|jpeg|png|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

2. **Configurar compressão**
```nginx
# Gzip compression
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css application/json application/javascript;
```

3. **Configurar CDN**
- Use Cloudflare ou AWS CloudFront
- Configure cache para imagens estáticas

### Monitoramento de Performance

```bash
# Instalar ferramentas de monitoramento
npm install -g clinic

# Análise de performance
clinic doctor -- node src/server.js
```

## 🔄 Atualizações

### Deploy de Atualizações

1. **Com Docker**
```bash
git pull origin main
docker-compose down
docker-compose up -d --build
```

2. **Com PM2**
```bash
git pull origin main
cd backend
npm install
pm2 restart etma-backend
```

3. **Com CI/CD**
- Push para a branch main
- Deploy automático via GitHub Actions

### Rollback

```bash
# Docker
docker-compose down
git checkout <commit-anterior>
docker-compose up -d

# PM2
pm2 stop etma-backend
git checkout <commit-anterior>
npm install
pm2 start ecosystem.config.js
```
