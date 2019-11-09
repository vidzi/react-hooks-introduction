import { useState, useEffect } from "react";

export const useHttp = (url, dependencies) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("Could not fetch person!");
        }
        return response.json();
      })
      .then(data => {
        // const loadedCharacter = {
        //   id: props.selectedChar,
        //   name: charData.name,
        //   height: charData.height,
        //   colors: {
        //     hair: charData.hair_color,
        //     skin: charData.skin_color
        //   },
        //   gender: charData.gender,
        //   movieCount: charData.films.length
        // };
        setData(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  }, dependencies);

  return [isLoading, data];
};
