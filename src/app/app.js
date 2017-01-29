const timeline = document.querySelector('#timeline');

let page = 1;
let fetchTrigger;
let fetching = false;

function setFetchTrigger(element) {
  fetchTrigger = element;
}

function fetchBeers() {
  fetching = true;
  window.fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=10`)
    .then(response => response.json()
      .then((beers) => {
        fetching = false;
        page += 1;
        beers.forEach((beer, index) => {
          const template = document.querySelector('#timeline-event-template');
          const fragment = template.content.cloneNode(true);
          const richMedia = fragment.querySelector('.card__rich-media');
          const richMediaImage = document.createElement('img');
          richMediaImage.src = `assets/images/${beer.id % 4}.jpg`;
          richMediaImage.alt = beer.name;
          new SmoothImage(richMediaImage);
          richMedia.appendChild(richMediaImage);

          const headerTitle = fragment.querySelector('.card__header-title');
          headerTitle.textContent = beer.contributed_by;

          const headerSubtitle = fragment.querySelector('.card__header-subtitle');
          headerSubtitle.textContent = beer.first_brewed;

          const subtitle = fragment.querySelector('.card__subtitle');
          subtitle.textContent = beer.tagline;

          const title = fragment.querySelector('.card__title');
          title.textContent = beer.name;

          const subtext = fragment.querySelector('.card__subtext');
          subtext.textContent = beer.description;

          const supportingText = fragment.querySelector('.card__supporting-text');
          supportingText.textContent = beer.brewers_tips;

          timeline.appendChild(fragment);
          if (index === beers.length - 1) {
            setFetchTrigger(timeline.lastChild.previousSibling);
          }
        });
      }));
}

window.addEventListener('scroll', () => {
  if (undefined !== fetchTrigger &&
    !fetching &&
    document.body.scrollTop > fetchTrigger.offsetTop - fetchTrigger.offsetHeight) {
    fetchBeers();
  }
});

fetchBeers();
