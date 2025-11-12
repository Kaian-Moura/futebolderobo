# Futebol de Robô — Documentação em Docusaurus

Este repositório foi preparado para servir a documentação com Docusaurus.

Passos rápidos (zsh):

```bash
# instalar dependências
npm install

# rodar site em modo dev (http://localhost:3000)
npm start

# gerar build estático
npm run build

# servir build localmente
npm run serve
```

Observações:

- O conteúdo original `documentacao.md` foi movido para `docs/intro.md`.
- Antes de rodar `npm install`, confirme que você quer instalar dependências (é necessário acesso à internet).

Se quiser, eu posso rodar `npm install` e `npm start` aqui para validar — diga se devo prosseguir.

Publicar no GitHub Pages
------------------------

1) Configure o repositório remoto (execute apenas se ainda não adicionou remoto):

```bash
git init
git add .
git commit -m "chore: init docusaurus docs"
git branch -M main
git remote add origin https://github.com/Kaian-Moura/futebolderobo.git
git push -u origin main
```

2) Deploy para GitHub Pages (a partir do diretório do projeto):

```bash
# instalar dependências (se ainda não instalou)
npm install

# gerar build e publicar em gh-pages
npm run deploy

# caso o deploy precise do usuário GitHub explícito, rode:
GIT_USER=Kaian-Moura npm run deploy
```

Observações:
- O `docusaurus.config.js` já está configurado com `organizationName: 'Kaian-Moura'` e `projectName: 'futebolderobo'`, e `baseUrl` ajustado para `/futebolderobo/`.
- Se preferir que eu faça o deploy aqui, diga e eu tento (mas normalmente é mais simples você rodar localmente e confirmar). 
