(() => {
  const stepElems = document.querySelectorAll('.step');
  const graphicElems = document.querySelectorAll('.graphic-item');
  const candidate1 = document.getElementById('candidate1');
  const candidate2 = document.getElementById('candidate2');
  const candidate3 = document.getElementById('candidate3');
  const candidate4 = document.getElementById('candidate4');
  const candidate5 = document.getElementById('candidate5');
  const candidate6 = document.getElementById('candidate6');
  let currentItem = graphicElems[0];
  let ioIndex;
  let can1Index = 0;
  let can2Index = 0;
  let can3Index = 0;
  let can4Index = 0;
  let can5Index = 0;
  let can6Index = 0;

  const io = new IntersectionObserver((entries, observer) => {
    ioIndex = entries[0].target.dataset.index * 1;
  });

  for (let i = 0; i < stepElems.length; i++) {
    io.observe(stepElems[i]);
    stepElems[i].dataset.index = i;
    graphicElems[i].dataset.index = i;
  }

  candidate1.addEventListener('click', function() {
    can1Index++
    if (can1Index%2 == 0) {
      document.getElementById('candidate1').setAttribute("src", "img/candidate1.png")
    } else {
      document.getElementById('candidate1').setAttribute("src", "img/level1.png")
    }
  })

  candidate2.addEventListener('click', function() {
    can2Index++
    if (can2Index%2 == 0) {
      document.getElementById('candidate2').setAttribute("src", "img/candidate2.png")
    } else {
      document.getElementById('candidate2').setAttribute("src", "img/level2.png")
    }
  })

  candidate3.addEventListener('click', function() {
    can3Index++
    if (can3Index%2 == 0) {
      document.getElementById('candidate3').setAttribute("src", "img/candidate3.png")
    } else {
      document.getElementById('candidate3').setAttribute("src", "img/level3.png")
    }
  })

  candidate4.addEventListener('click', function() {
    can4Index++
    if (can4Index%2 == 0) {
      document.getElementById('candidate4').setAttribute("src", "img/candidate4.png")
    } else {
      document.getElementById('candidate4').setAttribute("src", "img/level4.png")
    }
  })

  candidate5.addEventListener('click', function() {
    can5Index++
    if (can5Index%2 == 0) {
      document.getElementById('candidate5').setAttribute("src", "img/candidate5.png")
    } else {
      document.getElementById('candidate5').setAttribute("src", "img/level5.png")
    }
  })

  candidate6.addEventListener('click', function() {
    can6Index++
    if (can6Index%2 == 0) {
      document.getElementById('candidate6').setAttribute("src", "img/candidate6.png")
    } else {
      document.getElementById('candidate6').setAttribute("src", "img/level6.png")
    }
  })


  function activate() {
    currentItem.classList.add('visible');
  }

  function inactivate() {
    currentItem.classList.remove('visible');
  }

  window.addEventListener('scroll', () => {
    let step;
    let boundingRect;
    for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
      step = stepElems[i];
      if (!step) continue;
      boundingRect = step.getBoundingClientRect();
      if (boundingRect.top > window.innerHeight * 0.1 &&
        boundingRect.top < window.innerHeight * 0.8) {
        inactivate();
        currentItem = graphicElems[step.dataset.index];
        activate();
      }
    }
  });

  window.addEventListener('load', () => {
    setTimeout(() => scrollTo(0, 0), 100);
  });

  activate();

})();
