<!DOCTYPE html>
<html lang="en">
<head>
   <h1 id="Title"> Movie Fight</h1>
    <title>MovieFight</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Ajit-singh-rawlot/moviefight@main/MovieFight.css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"/>
    <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.css"/>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>
<body>
    
    <div class="container">
       <div class="columns">
           <div class="column">
                  <div id="left-autocomplete"></div>
                  <div id="left-summary"></div>
           </div>
           <div class="column">
                 <div id="right-autocomplete"></div>
                 <div id="right-summary"></div>

            </div>
     </div>
            <div class="column is-half notification is-primary tutorial">
                     <h2>Search movie name both side</h2>
                       <p class="subtitle">We will tell you which is best!!!!</p>
            </div>
       </div>

       <script src="https://cdn.jsdelivr.net/gh/Ajit-singh-rawlot/moviefight@main/autocomplete.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/Ajit-singh-rawlot/moviefight@main/MovieFight.js"></script>
</body>
</html>
