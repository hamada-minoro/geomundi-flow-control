#!/bin/sh
set -e

# Valores padrão para variáveis de ambiente
: ${ALLOWED_ORIGINS:="'self'"}

# Substituir variáveis de ambiente no arquivo de configuração do nginx
echo "Aplicando configurações de ambiente..."
envsubst '$ALLOWED_ORIGINS' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

# Verificar a configuração do nginx
nginx -t

# Iniciar o nginx como root (necessário para o Coolify)
echo "Iniciando nginx..."
exec nginx -g 'daemon off;'