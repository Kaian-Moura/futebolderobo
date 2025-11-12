# Futebol de Robô — Documentação Docusaurus

Documentação completa do projeto de robô futebol 2WD com ESP32 e TB6612.

## 📖 Acessar a Documentação

A documentação está publicada em: **https://kaian.me/futebolderobo/**

## 🛠️ Desenvolvimento Local

Para editar e testar a documentação localmente:

```bash
# instalar dependências
npm install

# rodar em modo dev (http://localhost:3000)
npm start

# gerar build estático
npm run build
```

## 📝 Editar Documentação

Os arquivos source estão em `docs/intro.md` e `docs/index.md`. Após editar:

```bash
# testar localmente
npm start

# gerar build
npm run build

# commitar e fazer push
git add .
git commit -m "docs: sua mensagem aqui"
git push
```

O site será atualizado automaticamente no GitHub Pages após o push.
