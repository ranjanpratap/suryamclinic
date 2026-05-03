// All Figma MCP asset URLs (expire after 7 days — replace with local assets for production)
const ASSETS = {
  // Textures & backgrounds
  texture:     'https://www.figma.com/api/mcp/asset/f92aae5e-f6d0-47f6-94a9-221de3728d5e',
  teamBg:      'https://www.figma.com/api/mcp/asset/ad1155c5-3ca0-4d6d-8a1c-bf7a739b812f',
  videoThumb:  'https://www.figma.com/api/mcp/asset/de169411-b744-40d5-b1b3-d4413c3a2c36',

  // Logo
  logoSym:     'https://www.figma.com/api/mcp/asset/d1418442-de5a-435b-a1ab-51cdf1fed7e1',
  logoTxt:     'https://www.figma.com/api/mcp/asset/513ed6c2-ef7e-4021-8a2f-cd87271945e8',

  // Hero
  heroChild:   'https://www.figma.com/api/mcp/asset/cce8cd5a-e92b-4294-8f93-2f6e046ed828',
  trophy:      'https://www.figma.com/api/mcp/asset/b64b615a-f576-4c4d-82fa-8cda456dcce8',
  group1:      'https://www.figma.com/api/mcp/asset/d66b633d-0527-44c7-a80c-16a6b7ab080b',
  vec5:        'https://www.figma.com/api/mcp/asset/d43a4bb0-a98f-41d0-a70b-0041228d2b3f',

  // Waves
  wave1:       'https://www.figma.com/api/mcp/asset/26327b20-5b17-4956-81fc-fdcb8b41f297',
  wave2:       'https://www.figma.com/api/mcp/asset/d6890613-314d-4d15-9264-d68f3af0b241',
  wave3:       'https://www.figma.com/api/mcp/asset/5d230f66-0048-4352-a4da-6acd4c8319ed',

  // Service / gallery images
  img1208:     'https://www.figma.com/api/mcp/asset/7f25822a-0ad1-4708-923b-6fa70e1816b7',
  img1209:     'https://www.figma.com/api/mcp/asset/c5ad6dd5-8f7c-4b8c-b439-7f421d68823a',
  img1210:     'https://www.figma.com/api/mcp/asset/74bade60-e7ff-49d7-a04e-b16c42c11bb4',
  img1211:     'https://www.figma.com/api/mcp/asset/fc14192f-e7a6-4dc1-98d7-dc1d67c4665c',
  img1212:     'https://www.figma.com/api/mcp/asset/2545d872-6278-4509-8cd8-35a8c12c64f2',

  // Condition icons
  brain:       'https://www.figma.com/api/mcp/asset/007403b3-2137-4a8e-9941-bb0cbed31b78',
  speech:      'https://www.figma.com/api/mcp/asset/f27e397b-c992-4acf-b298-d251a3e82874',
  target:      'https://www.figma.com/api/mcp/asset/2165326d-bed8-449e-a14d-d4983a42b289',
  book:        'https://www.figma.com/api/mcp/asset/f4f9181f-8011-474c-9b4f-f470be7f5017',
  puzzle:      'https://www.figma.com/api/mcp/asset/9a307cf4-0113-41ed-8b15-23fce65f20ef',
  run:         'https://www.figma.com/api/mcp/asset/08508b0a-3232-403e-9c0d-e4caef0e2da3',
  msg:         'https://www.figma.com/api/mcp/asset/74437bc5-ed38-4f27-ac16-3ea56742099e',

  // UI icons
  arrowR:      'https://www.figma.com/api/mcp/asset/c998bd3a-55fd-4eb8-b319-17b6f71e174b',
  call1:       'https://www.figma.com/api/mcp/asset/70cf2b07-d8d7-4311-a519-34691ef5dfa9',
  call2:       'https://www.figma.com/api/mcp/asset/a710527a-fca2-4943-bd88-3dd355b4d99f',
  circleR:     'https://www.figma.com/api/mcp/asset/e00b584f-1366-46ae-8105-2875c54d3606',
  circleR2:    'https://www.figma.com/api/mcp/asset/00f10b07-9260-4576-937e-33747a744d6b',
  play:        'https://www.figma.com/api/mcp/asset/16c949da-b9fb-4c2f-958d-90a0054d9bde',
  star:        'https://www.figma.com/api/mcp/asset/1539dd4d-ea51-464f-9ed7-0a761d903eb5',
  quote:       'https://www.figma.com/api/mcp/asset/6d880774-3a2d-4ab0-8d21-0811ff19a167',
  add:         'https://www.figma.com/api/mcp/asset/5df930ad-e999-47c0-ac30-5fa2b920655c',
  cancel:      'https://www.figma.com/api/mcp/asset/39128f05-3292-4393-a26f-765983e776f8',
  school:      'https://www.figma.com/api/mcp/asset/853008bd-c52e-4d65-8cfc-782df573a48e',

  // CTA vectors
  vec6:        'https://www.figma.com/api/mcp/asset/6ad60677-48b4-4d33-b7fa-d504dfadfe94',
  vec7:        'https://www.figma.com/api/mcp/asset/c1009a26-fd93-4eb0-8d26-79a2e7a48f97',

  // Contact section
  contactTexture: 'https://www.figma.com/api/mcp/asset/c559f399-b5b4-4336-aca7-801fdd2df37a',
  contactPhoto:   'https://www.figma.com/api/mcp/asset/c4121d47-4e2b-407b-848b-ef1c26c28076',

  // Footer
  footerTexture:  'https://www.figma.com/api/mcp/asset/6ebdb572-c70e-4d25-b699-41d0985b2e8d',
  socialLinkedin: 'https://www.figma.com/api/mcp/asset/787a6c1b-43c4-416e-9a0f-8b11967b3af0',
  socialFacebook: 'https://www.figma.com/api/mcp/asset/f733654e-3eed-4aa6-8eb9-61f0c3df025e',
  socialInstagram:'https://www.figma.com/api/mcp/asset/2f7ae89c-ea49-4170-a5bf-567491849da5',
  socialTwitter:  'https://www.figma.com/api/mcp/asset/812d0a2c-5be9-4f66-acef-4a9bbf95b35f',
  socialYoutube:  'https://www.figma.com/api/mcp/asset/9f9acea5-139e-487d-924c-26f81da06d83',
}

export default ASSETS
