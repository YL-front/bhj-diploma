/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = options.responseType;

    if (options.method === 'GET') {
       let params = '';
       
        for (let e in options.data) {
            const key = encodeURIComponent(e);
            const value = encodeURIComponent(options.data[key]);
            params += `&${key}=${value}`;
        }

        const resultUrl = options.url + '?' + params.slice(1);

        xhr.onload = () => {
            options.callback(null, xhr.response);
        }

        xhr.onerror = () => {
            options.callback(xhr.response, null);
        }

        try {
            xhr.open(options.method, resultUrl);
            xhr.send();
        } catch (error) {
            alert(error.message);
        }
    } else {
    const formData = new FormData();

    for (let key in options.data) {
      formData.append(key, options.data[key]);
    }

    xhr.onload = () => {
      options.callback(null, xhr.response);
    }

    xhr.onerror = () => {
      options.callback(xhr.response, null);
    }

    try {
      xhr.open(options.method, options.url);
      xhr.send(formData);
    } catch (error) {
      console.log(error);
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
