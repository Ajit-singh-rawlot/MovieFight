alert();
const createAutoCompleteConfig= {
    renderOption(movie)
    {
        const imgSrc=movie.Poster==="N/A"?" ":movie.Poster;
        return  `<img src="${imgSrc}" width="34px" height="50px" float="right">${movie.Title}(${movie.Year})`;
        
    },
      
         inputValueFun(movie)
         {return movie.Title;},
         async fetchData (title)
         {
             response= await axios.get("http://www.omdbapi.com/",
             {
                 params:
                 {
                  apikey:"3d7ee8b",
                  s:title
                 }
             })
             if(response.data.Error)
             {
                 return [];
             }
            return response.data.Search;
         }
};


createAutocomplete({...createAutoCompleteConfig,root:document.querySelector("#left-autocomplete"), onOptionSelect(movie)
{
onMovieSelect(movie,document.querySelector("#left-summary"),'left');
document.querySelector(".tutorial").classList.add("is-hidden");
}});
createAutocomplete({...createAutoCompleteConfig,root:document.querySelector("#right-autocomplete"), onOptionSelect(movie)
{
onMovieSelect(movie,document.querySelector("#right-summary"),'right');
document.querySelector(".tutorial").classList.add("is-hidden");
}});

const movieTemplate=movieDetails=>
{
   
const dollors=parseInt(movieDetails.BoxOffice.replace(/\$/g,"").replace(/,/g,""));
const imdbRating=parseFloat(movieDetails.imdbRating);
const imdbVotes=parseInt(movieDetails.imdbVotes.replace(/,/g,""));
const metaScore=parseInt(movieDetails.Metascore);

let awards=parseInt(movieDetails.Awards.split(" ").reduce((pre,cur)=>{


if(parseInt(cur))
{
  return parseInt(pre)+parseInt(cur);
}
else{
  return parseInt(pre);
}

},0));


    return ` <article class="media">
               <figure class="media-left">
                 <p class="image">
                   <img src="${movieDetails.Poster}">
                    </p>
                  </figure>
                 <div class="media-content">
                   <div class="content">
                     <h2>${movieDetails.Title}</h2>
                     <h4>${movieDetails.Genre}  </h4>
                     <p>${movieDetails.Plot}</p>
                    </div>
                   </div>
                 </article>
               <article class="notification is-primary" data-value=${awards}>
                <p class="title" >${movieDetails.Awards}</p>
                <p class="subtitle">Awards </p>
                </article>  
                <article class="notification is-primary"  data-value=${dollors}>
                <p class="title">${movieDetails.BoxOffice}</p>
                <p class="subtitle">BoxOffice </p>
                </article>  
                <article class="notification is-primary"  data-value=${metaScore}>
                <p class="title">${movieDetails.Metascore}</p>
                <p class="subtitle">MetaScore </p>
                </article>  
                <article class="notification is-primary" data-value=${imdbRating}>
                <p class="title" >${movieDetails.imdbRating}</p>
                <p class="subtitle">IMDB Rating </p>
                </article>  
                <article class="notification is-primary" data-value=${imdbVotes}>
                <p class="title" >${movieDetails.imdbVotes}</p>
                <p class="subtitle">Votes </p>
                </article>  

    `
}
let leftSide;
let rightSide;
async function onMovieSelect(movie,div,side)
{
    
  const respons=await axios.get("http://www.omdbapi.com/",
  {
      params:
      {
       apikey:"3d7ee8b",
       i:movie.imdbID
      }
  })
 div.innerHTML=movieTemplate(respons.data);
 if(side==="left")
 {
  leftSide=respons.data;
 }
 else
 {
   rightSide=respons.data;
 }

  if(rightSide && leftSide)
  {
    compareMovies();
  }


}
const  compareMovies=()=>
{
 const rightSideDetails=document.querySelectorAll("#right-summary .notification");
 const leftSideDetails=document.querySelectorAll("#left-summary .notification");
 
leftSideDetails.forEach((LeftStats,index)=>
     {
      
        const rightStats=rightSideDetails[index];
        const leftSidevalue=LeftStats.dataset.value;
        const rightSideValue=rightStats.dataset.value;
      
        if(rightSideValue>leftSidevalue)
        {
          LeftStats.classList.remove("is-primary");
          LeftStats.classList.add("is-warning");
        }
        else
        {
          rightStats.classList.remove("is-primary");
          rightStats.classList.add("is-warning");
        }

      })
}
