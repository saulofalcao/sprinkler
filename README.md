# Sprinkler

## Daemon:
* Criar um banco mysql e fazer o seed do sprinkler.sql (recomendo instalar depois o phpMyAdmin - pode ser através do repositorio debian/ubuntu
* instalar o nodejs (de preferencia compilar e NÃO usar o pacote do ubuntu/debian, 
pois este pacote cria um executável 'nodejs' e o padrão é apenas 'node'. 
Seguir instruções do http://nodejs.org com instalação normal do .tar.gz
* Alterar as configurações do banco de dados em BD.js (linhas 19 a 22)
* Com o node instalado, entrar na pasta daemon e executar node daemon.js

No estágio atual o daemon apenas identifica as programações aplicáveis para aquele momento.

Para testar:
* acesse o seu banco de dados e altere a hora_inicio de alguma programação da tabela "programacoes". 
* altere a hora_inicio para próximo da hora atual (2 minutos a mais, por exemplo) (não se preocupe com a data, o sistema ignora a data e lê só a hora)
* altere a coluna "ativa" para 1 e aguarde o programa exibir no console a programação ativa para aquele momento.


