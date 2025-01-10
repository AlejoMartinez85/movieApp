import { constants } from "../../constants/constants";
/**
 * function that receives a path and completes
 * it in order to obtain the images of films and actors.
 * @param posterPath
 * @returns
 */
export const returnPosterUrl = (posterPath: string | undefined): string => {
  return posterPath ? `${constants.api.imagePosterEndpoint}${posterPath}` : constants.api.imageDefault
};

/**
 * Converts movie duration from minutes to "Xh Ym" format.
 * @param durationInMinutes - The duration of the movie in minutes.
 * @returns A string representing the duration in hours and minutes.
 */
export const formatMovieDuration = (durationInMinutes: number): string => {
  const hours = Math.floor(durationInMinutes / 60);
  const minutes = durationInMinutes % 60;

  const hoursText = hours > 0 ? `${hours}h` : '';
  const minutesText = minutes > 0 ? `${minutes}m` : '';

  return `${hoursText} ${minutesText}`.trim();
}
