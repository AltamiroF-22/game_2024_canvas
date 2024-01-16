let folderTree = {
  name: "root",
  children: [
    {
      name: "Trabalho",
      children: [
        {
          name: "Projetos",
          children: [
            { name: "Projeto A", children: [] },
            { name: "Projeto B", children: [] }
          ]
        },
        { name: "Relatórios", children: [] }
      ]
    },
    {
      name: "Pessoal",
      children: [
        { name: "Viagens", children: [] },
        { name: "Fotos", children: [] },
        {
          name: "Hobbies",
          children: [
            { name: "Pintura", children: [] },
            { name: "Música", children: [] }
          ]
        }
      ]
    },
    {
      name: "Estudos",
      children: [
        {
          name: "Matemática",
          children: [
            "Arquivo1.txt",
            "Arquivo2.txt",
            "Arquivo3.txt",
            "Arquivo4.txt",
            "Arquivo5.txt",
            "Arquivo6.txt",
            "Arquivo7.txt",
            "Arquivo8.txt",
            "Arquivo9.txt",
            "Arquivo10.txt",
            "Arquivo11.txt",
            "Arquivo12.txt",
            "Arquivo13.txt",
            "Arquivo14.txt",
            "Arquivo15.txt",
            "Arquivo16.txt",
            "Arquivo17.txt",
            "Arquivo18.txt",
            "Arquivo19.txt",
            "Arquivo20.txt"
          ]
        },
        {
          name: "Programação",
          children: [
            {
              name: "JavaScript",
              children: [
                "Script1.js",
                "Script2.js",
                "Script3.js",
                "Script4.js",
                "Script5.js"
              ]
            },
            {
              name: "Python",
              children: [
                "ScriptA.py",
                "ScriptB.py",
                "ScriptC.py",
                "ScriptD.py",
                "ScriptE.py"
              ]
            }
          ]
        }
      ]
    }
  ]
};

const recursionArchive = (folderName, root) => {
  if (folderName === root.name) return root;

  for (const dir of root.children) {
    if (Array.isArray(dir.children)) {
      const result = recursionArchive(folderName, dir);
      if (result) return result;
    }
  }
  return null;
};


const searchInput = "pintura"; // search for folder
const formattedSearchInput = searchInput.charAt(0).toUpperCase() + searchInput.slice(1);
let findDir = recursionArchive(formattedSearchInput, folderTree);

const forChildren = () => {
  if (findDir && findDir.children.length === 0) {
    console.log(findDir.name);
    console.log(findDir);
  } else if (
    findDir &&
    Array.isArray(findDir.children) &&
    findDir.children.length > 0
  ) {
    console.log(`Folder Name: ${findDir.name}\n`);
    for (let i = 0; i < findDir.children.length; i++) {
      console.log(findDir.children[i]);
    }
  } else {
    console.log("Folder name not found.");
  }
};

forChildren();
