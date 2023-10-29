# T.H.U.R.S.D.A.Y.
This is **T**ext en**H**anced **U**ser suppo**R**t **S**ystem day by **DAY**, a desktop chat application to support your daily work. 
Using OpenAI API and LangChain, AI will answer your questions using documents stored in the user's local environment and web searches.

![image](https://github.com/jphacks/NG_2313/assets/50434558/45e9c58c-ce1d-406b-bf87-2e32600f40bd)

One point of differentiation from ChatGPT is that it can specify a directory in the user's local environment, read all the documents in that directory, and answer questions about those documents. In addition, we are aiming to develop a chat system that can be more deeply personalized for each individual, based on user information.

## Status
### Current Status (2023/10/29)
Now, it has two functions.

1. To answer the given question about a document, which starts with word "pdf", that the user uploaded.
2. To answer the given quesiotn searching web.

### Future Works
1. Enable it to read texts sotred in any local repositories.
2. Enable it to read any kinds of documents such as .doc, .ppt, .md etc. 
3. Enable it to extract user information and personalize to the each user.

## Usage

### Prerequisites

- Node.js
- npm
- Code Editor (VSCode is recommended)

### Editor Setting for VSCode (Optional)

#### Install extensions

- VS Code ES7 React/Redux/React-Native/JS snippets
- Prettier - Code formatter
- ESlint
- Tailwind CSS IntelliSense

#### Formatter setting

1. Open 'User Setting'
1. Type 'formatter' in the search bar and select Prettier on the 'Editor:Default Formatter' tab.
1. Type 'format on save' in the search bar and check the box.

### Install Dependencies

```
npm install
```

### Prepare Backend
Visit this link and setup the backend server with a different process.
https://github.com/jphacks/NG_2313_1/tree/178a1d8058093bff3acaf92ad64de3620042ae26

### Run

```
# development mode
$ npm run dev

# production build
$ npm run build
```

## Technologies used

- Next.js
- Electron
- Tailwind
- Eslint
- Prettier
