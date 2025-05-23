const generateBtn = document.getElementById('generate');
const photo = document.getElementById('photo');
const quote = document.getElementById('quote');
const photoLink = document.getElementById('photo-link');

const UNSPLASH_ACCESS_KEY = '17gHMA6RukKGgmTL7iBFdU85J3PKLxXDztC45QbVZbU';

async function getRandomPhoto() {
  const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${UNSPLASH_ACCESS_KEY}&query=inspiration&utm_source=quote-photo-generator&utm_medium=referral`);
  const data = await response.json();
  photo.src = data.urls.regular;
  photo.alt = data.alt_description || 'Натхненне фото';
  photoLink.href = data.user.links.html + '?utm_source=quote-photo-generator&utm_medium=referral';
  photoLink.textContent = data.user.name;
}

function getRandomQuote() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const callbackName = 'forismaticCallback';

    window[callbackName] = (data) => {
      if (data && data.quoteText) {
        quote.textContent = `${data.quoteText} — ${data.quoteAuthor || 'Невідомий автор'}`;
        resolve();
      } else {
        reject('Помилка отримання цитати');
      }
      document.body.removeChild(script);
    };

    script.src = `https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=${callbackName}`;
    document.body.appendChild(script);
  });
}

async function generateInspiration() {
  await Promise.all([getRandomPhoto(), getRandomQuote()]);
}

generateBtn.addEventListener('click', generateInspiration);

generateInspiration();