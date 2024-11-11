// Selecting DOM elements
const color1Input = document.getElementById("color1");
const color2Input = document.getElementById("color2");
const color3Input = document.getElementById("color3");
const gradientTypeInput = document.getElementById("gradientType");
const preview = document.getElementById("preview");
const cssOutput = document.getElementById("cssOutput");
const directionInput = document.getElementById("direction-linear");
const directionInput2 = document.getElementById("direction-radial");
const directionInput3 = document.getElementById("direction-conic");

const customInput = document.getElementById("custom-angle");
const opacity1Input = document.getElementById("opacity1");
const opacity2Input = document.getElementById("opacity2");
const opacity3Input = document.getElementById("opacity3");
const randomButton = document.getElementById("randombutton");
const download = document.getElementById("download");

 let gradientCSS = null;


//this function is complex will wait for it to be done
function downloadFile() {
  const gradientCSSView = gradientCSS; // Get gradient CSS from the textarea
  const size = download.value || 500; // Set size for the gradient image, default to 500px

  // Create a canvas element
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  // Get the canvas context
  const ctx = canvas.getContext("2d");

  // Create the gradient depending on the type (conic, linear, etc.)
  let gradient;

  if (gradientCSSView.includes("conic-gradient")) {
    // Example of creating a conic-gradient on canvas
    gradient = ctx.createConicGradient(
      (90 * Math.PI) / 180,
      size / 2,
      size / 2
    ); // 90 degrees as radian
    gradient.addColorStop(0, "rgba(84, 107, 194, 0.9)");
    gradient.addColorStop(0.5, "rgba(108, 161, 165, 0.7)");
    gradient.addColorStop(1, "rgba(147, 106, 87, 0.8)");
  } else if (gradientCSSView.includes("linear-gradient")) {
    // Example for linear-gradient
    gradient = ctx.createLinearGradient(0, 0, size, size); // Diagonal gradient
    gradient.addColorStop(0, "rgba(84, 107, 194, 0.9)");
    gradient.addColorStop(0.5, "rgba(108, 161, 165, 0.7)");
    gradient.addColorStop(1, "rgba(147, 106, 87, 0.8)");
  } else {
    // Fallback or radial gradient
    gradient = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2
    );
    gradient.addColorStop(0, "rgba(84, 107, 194, 0.9)");
    gradient.addColorStop(0.5, "rgba(108, 161, 165, 0.7)");
    gradient.addColorStop(1, "rgba(147, 106, 87, 0.8)");
  }

  // Fill the canvas with the gradient
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Generate the image data URL from the canvas
  const dataURL = canvas.toDataURL("image/png");

  // Create a link element to trigger the download
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "gradient.png"; // Set the download file name
  link.click(); // Trigger the download
}











function previewModeScreen() {
  // Request full screen
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) {
    // Firefox
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    // Chrome, Safari and Opera
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    // IE/Edge
    document.documentElement.msRequestFullscreen();
  }

  

 const contentScreen = document.getElementsByClassName("content-container");
  //console.log(contentScreen[0]);
// console.log(typeof contentScreen[0]);

 
  contentScreen[0].setAttribute("hidden", true);
  contentScreen[1].setAttribute("hidden", true);

  setTimeout(() => {
    contentScreen[0].removeAttribute("hidden");
    contentScreen[1].removeAttribute("hidden");

  }, 6200);

}




 function copyToClipboard() {
   const cssCode = document.getElementById("cssOutput").value;


   console.log( cssCode);

   navigator.clipboard
     .writeText(cssCode)
     .then(() => {
       console.log("CSS code copied to clipboard successfully!");
     })
     .catch((err) => {
       console.error("Failed to copy text: ", err);
     }); 


 }

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomOpacity() {
  return Math.random();

}

randomButton.addEventListener("click", () => {
  const randomColor1 = getRandomColor();
  const randomColor2 = getRandomColor();
  const randomColor3 = getRandomColor();
  const randomOpacity1 = getRandomOpacity();
  const randomOpacity2 = getRandomOpacity();
  const randomOpacity3 = getRandomOpacity();

  const randomGradientType = Math.random() >= 0.7 ? "linear" : Math.random() >= 0.4 ? "radial" : "conic";

  color1Input.value = randomColor1;
  color2Input.value = randomColor2;
  color3Input.value = randomColor3;
  opacity1Input.value = randomOpacity1;
  opacity2Input.value = randomOpacity2;
  opacity3Input.value = randomOpacity3;
  gradientTypeInput.value = randomGradientType;

  updateGradient();
});










// Function to update the gradient background and CSS code
function updateGradient() {
  const color1 = color1Input.value;
  const color2 = color2Input.value;
  const color3 = color3Input.value;
  const direction = directionInput.value;
  const direction2 = directionInput2.value;
   const direction3 = directionInput3.value;
  const gradientType = gradientTypeInput.value;
  const opacity1 = opacity1Input.value;
  const opacity2 = opacity2Input.value;
  const opacity3 = opacity3Input.value;

 

  const color1RGBA = `rgba(${hexToRgb(color1).r}, ${hexToRgb(color1).g}, ${
    hexToRgb(color1).b
  }, ${opacity1})`;
  const color2RGBA = `rgba(${hexToRgb(color2).r}, ${hexToRgb(color2).g}, ${
    hexToRgb(color2).b
  }, ${opacity2})`;
  const color3RGBA = `rgba(${hexToRgb(color3).r}, ${hexToRgb(color3).g}, ${
    hexToRgb(color3).b
  }, ${opacity3})`;


// if & else gradient type


  directionInput.removeAttribute("hidden");
  directionInput.removeAttribute("style");
  directionInput2.removeAttribute("style");
  directionInput3.removeAttribute("style");
  directionInput2.removeAttribute("hidden");
  directionInput3.removeAttribute("hidden");


  switch(gradientType){
  case "radial" : 
     directionInput.setAttribute("hidden", true);
     directionInput3.setAttribute("hidden", true);
     break;

   case "linear": 
     directionInput2.setAttribute("hidden", true);
      directionInput3.setAttribute("hidden", true);
     break;

   case "conic": 
     directionInput2.setAttribute("style", "display:none;");
     directionInput.setAttribute("style", "display:none;");
   break;
  }





  if (direction === "custom" && gradientType === "radial") {
    customInput.setAttribute("style", "display:none;");
  }else if (direction === "custom") {
    customInput.removeAttribute("style");
  }else {
    customInput.setAttribute("style", "display:none;");
  }
 
  let inputdeg = 0;

  document
    .getElementById("custom-angle")
    .addEventListener("input", function () {
      inputdeg = this.value + "deg";
      console.log(inputdeg);

    });


     if (gradientType === "linear") {
       gradientCSS = `linear-gradient(${
         inputdeg ? inputdeg : direction
       }, ${color1RGBA}, ${color2RGBA}, ${color3RGBA})`;
       console.log(gradientCSS);
     } else if (gradientType === "radial") {
       gradientCSS = `radial-gradient(${direction2}, ${color1RGBA}, ${color2RGBA}, ${color3RGBA})`;
     } else {
       gradientCSS = `conic-gradient(${direction3}, ${color1RGBA}, ${color2RGBA}, ${color3RGBA})`;
     }


  // Apply the gradient to the preview div
  preview.style.background = gradientCSS;

  // Show the generated CSS code in the textarea
  cssOutput.value = `background: ${gradientCSS};`;
  cssOutput.style.background = "None";



  // Save theme preference
  localStorage.setItem("c1", color1);
  localStorage.setItem("c2", color2);
  localStorage.setItem("c3", color3);
  localStorage.setItem("gt", gradientType);
  localStorage.setItem("direction", direction);
  localStorage.setItem("o1", opacity1);
  localStorage.setItem("o2", opacity2);
  localStorage.setItem("o3", opacity3);
  localStorage.setItem("direction2", direction2);
  localStorage.setItem("direction3", direction3);

}

function hexToRgb(hex) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return { r, g, b };
}

// Adding event listeners to inputs
color1Input.addEventListener("input", updateGradient);
color2Input.addEventListener("input", updateGradient);
color3Input.addEventListener("input", updateGradient);
gradientTypeInput.addEventListener("change", updateGradient);
directionInput.addEventListener("change", updateGradient);
directionInput2.addEventListener("change", updateGradient);
directionInput3.addEventListener("change", updateGradient);
opacity1Input.addEventListener("input", updateGradient);
opacity2Input.addEventListener("input", updateGradient);
opacity3Input.addEventListener("input", updateGradient);






//




// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const color1 = localStorage.getItem("c1");
  const color2 = localStorage.getItem("c2");
  const color3 = localStorage.getItem("c3");
  const gradientType = localStorage.getItem("gt");
  const direction = localStorage.getItem("direction");
  const direction2 = localStorage.getItem("direction2");
  const direction3 = localStorage.getItem("direction3");
  const opa1 = localStorage.getItem("o1");
  const opa2 = localStorage.getItem("o2");
  const opa3 = localStorage.getItem("o3");
   
if(color1 && color2 && color3 && gradientType && direction){

    color1Input.value = color1;
    color2Input.value = color2;
    color3Input.value = color3;
    gradientTypeInput.value = gradientType;
    directionInput.value = direction;
    directionInput2.value = direction2;
    directionInput3.value = direction3;
    opacity1Input.value= opa1;
    opacity2Input.value= opa2;
    opacity3Input.value= opa3;


    updateGradient();

}else {
  
    updateGradient();
}

});









// Initialize the gradient on page load
// updateGradient();

