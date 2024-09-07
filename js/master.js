//------------ Settings Box ------------//

//color
let mainColor = localStorage.getItem("color");
if (mainColor) {
  document.documentElement.style.setProperty("--main--color", `${mainColor}`);
  document.querySelectorAll(".colors-list li").forEach((el) => {
    el.classList.remove("active");
    if (el.dataset.color === mainColor) {
      el.classList.add("active");
    }
  });
}

document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};
let colorsList = document.querySelectorAll(".colors-list li");

colorsList.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    handleActive(e);
    localStorage.setItem("color", ele.dataset.color);
    document.documentElement.style.setProperty(
      "--main--color",
      `${ele.dataset.color}`
    );
  });
});

//------------ Images ------------//

let backgroundOptions = true;
let backgroundInterval;
function randomImg() {
  if (backgroundOptions === true) {
    backgroundInterval = setInterval(() => {
      let imgsArr = [1, 2, 3, 4, 5, 6, 7];
      let landPgImgs = document.querySelector(".landing-page");
      let rndmNum = Math.floor(Math.random() * imgsArr.length);
      landPgImgs.style.backgroundImage = `url('../imgs/0${imgsArr[rndmNum]}.jpg')`;
    }, 10000);
  }
}
randomImg();

//random background

let yesNo = document.querySelectorAll(
  ".settings-box .option-box .random-backgrounds span"
);

if (localStorage.getItem("background") === "false") {
  backgroundOptions = false;
  clearInterval(backgroundInterval);
  yesNo.forEach((ele) => {
    ele.classList.remove("active");
    document
      .querySelector(".random-backgrounds span.no")
      .classList.add("active");
  });
}

yesNo.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    handleActive(e);
    localStorage.setItem("background", ele.dataset.background);
    if (e.target.dataset.background === "yes") {
      backgroundOptions = true;
      localStorage.setItem("background", backgroundOptions);
      randomImg();
    } else {
      backgroundOptions = false;
      localStorage.setItem("background", backgroundOptions);
      clearInterval(backgroundInterval);
    }
  });
});

//------------ Links ------------//

let links = document.querySelectorAll(".links li a");

links.forEach((ele) => {
  ele.addEventListener("click", () => {
    links.forEach((el) => {
      el.classList.remove("active");
    });
    ele.classList.add("active");
  });
});

//------------ Skills ------------//
addEventListener("scroll", () => {
  let ourSkills = document.querySelector(".skills");
  // ourSkills.offsetTop; // 1333 من بداية الصفحة لحد اول السكشن
  // ourSkills.offsetHeight; // 587 ارتفاع السكشن نفسه
  // window.innerHeight; // 855 ارتفاع الصفحة
  // this.scrollY; // المكان اللي وصلتله بالسكرول (اعلي المؤشر)
  if (
    this.scrollY >=
    ourSkills.offsetTop + ourSkills.offsetHeight - window.innerHeight
  ) {
    let allSkills = document.querySelectorAll(
      ".skills .skill-box .skill-progress span"
    );
    allSkills.forEach((ele) => {
      ele.style.width = ele.dataset.progress;
    });
  }
});

//------------ Gallery ------------//

let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    let popupImage = document.createElement("img");
    popupImage.src = ele.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);
    popupImage.addEventListener("click", () => {
      overlay.remove();
      popupBox.remove();
      imgHeading.remove();
    });
  });
});

/* Start Nav Bullets */
function scrollToSection(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
const allLinks = document.querySelectorAll(".links a");
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
scrollToSection(allLinks);
scrollToSection(allBullets);

/* End Nav Bullets */

/* Start Handle Active */
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  ev.target.classList.add("active");
}
/* End Handle Active */

/* Start Toggle Menu */

const toggleBtn = document.querySelector(".toggle-menu");
const tlinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tlinks.classList.toggle("open");
};

document.addEventListener("click", function (ev) {
  if (ev.target !== toggleBtn && ev.target !== tlinks) {
    if (tlinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      tlinks.classList.toggle("open");
    }
  }
});

tlinks.onclick = function (e) {
  e.stopPropagation();
};

/* End Toggle Menu */
