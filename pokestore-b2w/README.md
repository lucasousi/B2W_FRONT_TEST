# Desafio PokestoreB2W

Esse projeto foi gerado sob a arquitetura Monorepo usando [Nx](https://nx.dev/).

## Pontos atendidos
- Catálogo de produtos
- Carrinho lateral
- Resumo do carrinho
- 3 lojas com estilos e tipos diferentes de Pokémon
- Barra de busca para filtrar os Pokémon
- Botão de finalizar compra, reiniciando o processo de compra
- Modal de obrigado ao finalizar compra

Extras
- Salvar os dados da compra do usuário localmente para não perdê-las ao atualizar a página.
- Uma página com mais detalhes do Pokémon, tendo informações como os tipos, movimentos, pontos fracos e pontos fortes. Dessa forma o usuário poderá navegar para essa página e adicionar o Pokémon no carrinho ou voltar para o catálogo.
- Testes E2E/UI automatizados para garantir que suas funcionalidades estão funcionando corretamente. (Não finalizado)

## Instalando dependências

Na pasta pokestore-b2w, execute:

```tsx
npm i
```

ou

```tsx
yarn
```

## Executando projetos localmente

## Aquáticos

Execute o comando `nx serve aquamons-store` dentro da pasta pokestore-b2w e acesse em [http://localhost:3000](http://localhost:3000/).

<img src="https://i.ibb.co/X5xqjRc/screencapture-localhost-3000-2021-06-08-10-57-04.png" width="720">

## Fogo

Execute o comando `nx serve firemons-store` dentro da pasta pokestore-b2w e acesse em [http://localhost:3001](http://localhost:3001/).

<img src="https://i.ibb.co/9VcvFGc/screencapture-localhost-3001-2021-06-08-10-57-19.png" width="720">

## Psíquicos

Execute o comando `nx serve psychicmons-store` dentro da pasta pokestore-b2w e acesse em [http://localhost:3002](http://localhost:3002/).

<img src="https://i.ibb.co/WpvpWQg/screencapture-localhost-3002-2021-06-08-10-58-01.png" width="720">
