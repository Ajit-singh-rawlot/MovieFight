const createAutocomplete=(
    {root,
        renderOption,
        onOptionSelect,
        inputValueFun,
        fetchData}
    )=>
{

root.innerHTML=`
<label>
<b>Search for a movie name</b>
</label>
<input class="input" id="inp"/> 
<div class="dropdown">
  <div class="dropdown-menu">
    <div class="dropdown-content results"></div>
   </div>
 </div>
`;
const inputField=root.querySelector(".input");
const dropdown=root.querySelector(".dropdown");
const results=root.querySelector(".results");
let timeoutId;
const onInputValue= event=>{
   
    if(timeoutId)
    {
        clearTimeout(timeoutId);
    }
  timeoutId=  setTimeout(async()=>
    {
        
      const movies=await  fetchData(event.target.value)
      if(!movies.length)
      {
          dropdown.classList.remove("is-active");
          return;
      }
      results.innerHTML="";
      dropdown.classList.add("is-active");
      for (const movie of movies) {
        const option= document.createElement("a");
         const imgSrc=movie.Poster==="N/A"?" ":movie.Poster;
         option.classList.add('dropdown-item');
        option.innerHTML=renderOption(movie);
      results.appendChild(option);
      option.addEventListener("click",()=>
      {
        dropdown.classList.remove("is-active");
        inputField.value=inputValueFun(movie);
       
       onOptionSelect(movie);
       

      })
      }
    
    },500)
 
};
inputField.addEventListener("input",onInputValue)
document.addEventListener("click",(event)=>
{
    if(!root.contains(event.target))
    {
        dropdown.classList.remove("is-active");
    }
})


 }
 