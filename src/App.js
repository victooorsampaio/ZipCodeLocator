import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./styles.css";
import api from "./services/api";

function App() {


const [input, setInput]= useState('')
const [cep, setCep]=useState({})

async function handleSearch(){
  if(input === ''){
    alert('Please enter a search')
    return;
  }
  try{
    const response = await api.get(`${input}/json`);
    setCep(response.data);
    setInput('');

  }catch{
    alert('error ao buscar o CEP digitado');
    setInput("");
  }
}
return (
    <div className="Container">
      <h1 className="Title" >
        Buscador de cep
      </h1>
     <div className="ContainerInput">
      <input 
      type="text"
      placeholder="Digite o seu cep"
      value={input}
      onChange={(event) => setInput(event.target.value)} 
      />
      <button className="ButtonSearch" onClick={handleSearch}>
        <FiSearch className = "ButtonLupa"/>
      </button>
     </div> 
     {Object.getOwnPropertyNames(cep).length > 0 &&(
       <main className="Main">
        <h2>{cep.cep}</h2>
        <h3 className="Description">
          <span>{cep.logradouro} </span>
          <span> {cep.complemento} </span>
          <span> {cep.bairro} </span>
          <span> {cep.localidade} {cep.uf} </span>
        </h3>
     </main>
     )}
      
    </div>
  );
}

export default App;  
