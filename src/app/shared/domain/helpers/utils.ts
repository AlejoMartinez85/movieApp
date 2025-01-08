import { constants } from "../../constants/constants";

export const returnPosterUrl = (posterPath: string | undefined): string => {
  return posterPath ? `${constants.api.imagePosterEndpoint}${posterPath}` : constants.api.imageDefault
};
