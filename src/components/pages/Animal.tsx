import { networkInterfaces } from "os";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IAnimal } from "../../models/IAnimals";
import { getList, save } from "../../services/StorageService";
import { StyledHeader } from "../StyledComponents/StyledHeader";
import {
  AnimalWrapper,
  MainWrapper,
  SingleAnimalWrapper,
} from "../StyledComponents/StyledWrappers";

export const Animal = () => {
  const [animal, setAnimal] = useState<IAnimal>({
    id: 0,
    name: "",
    yearOfBirth: "",
    longDescription: "",
    imageUrl: "",
    lastFed: "",
    isFed: false,
    shortDescription: "",
  });

  const navigate = useNavigate();

  let params = useParams() as { id: string };

  let animalsFromLS: IAnimal[] = getList();

  useEffect(() => {
    for (let i = 0; i < animalsFromLS.length; i++) {
      if (+params.id === animalsFromLS[i].id) {
        setAnimal(animalsFromLS[i]);
      }
    }
  }, []);

  /////// CHECK IF 3 HOURS HAVE ELAPSED ////////
  useEffect(() => {
    const lastFed = Date.parse(animal.lastFed);
    const dateRightNow = Date.now();

    if (dateRightNow - lastFed > 10800000) {
      const tempAnimal = { ...animal, isFed: false };
      setAnimal(tempAnimal);
    }
  }, [animal.isFed]);
  ///////////////////////////////////////////////

  const feedAnimal = (a: IAnimal) => {
    const tempAnimal = {
      ...animal,
      isFed: true,
      lastFed: new Date(Date.now()).toISOString(),
    };
    let animalsFromLS: IAnimal[] = getList();

    for (let i = 0; i < animalsFromLS.length; i++) {
      if (a.id === animalsFromLS[i].id) {
        animalsFromLS[i] = { ...tempAnimal };
      }
    }
    setAnimal(tempAnimal);
    save(animalsFromLS);
  };

  return (
    <>
      <MainWrapper>
        <div className="animalContainer">
          <div className="imageWrapper">
            <img src={animal.imageUrl} alt={animal.name} />
          </div>
          <h1>{animal.name}</h1>
          <SingleAnimalWrapper>
            <span>{animal.longDescription}</span>
          </SingleAnimalWrapper>
          <div className="buttonAndBackWrapper">
            {animal.isFed ? (
              <button className="feedButton" disabled>
                {animal.name} är mätt
              </button>
            ) : (
              <button
                className="feedButton"
                onClick={() => {
                  feedAnimal(animal);
                }}
              >
                Mata {animal.name}
              </button>
            )}
            <p className="lastFed">Matades senast: {animal.lastFed}</p>
            <p className="backClass" onClick={() => navigate(-1)}>
              {" "}
              Tillbaka
            </p>
          </div>
        </div>
      </MainWrapper>
    </>
  );
};

function LOCALSTORAGE_KEY(LOCALSTORAGE_KEY: any) {
  throw new Error("Function not implemented.");
}
