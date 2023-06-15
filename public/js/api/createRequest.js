/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = options.responseType;

  if (options.method === 'GET') {
    options.url += '?';

      for (let e in options.data) {
        const key = encodeURIComponent(e);
        const value = encodeURIComponent(options.data[key]);
        
        options.url += `&${key}=${value}`;
      }

      try {
        xhr.open(options.method, options.url);
        xhr.send();
      } catch (error) {
        options.callback(error);
        alert(error.message);
      }
  } else {
    const formData = new FormData();

    for (let key in options.data) {
      formData.append(key, options.data[key]);
    }

    try {
      xhr.open(options.method, options.url);
      xhr.send(formData);
    } catch (error) {
      console.log(error);
      options.callback(error);
      alert(error.message);
    }
  }

  xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            options.callback(null, xhr.response);
        }
    }
};
