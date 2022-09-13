import { middlewareApi } from "../../../../store/middlewareApi";
import { Movie } from '../interfaces/Movie';

export const movieTags = middlewareApi.enhanceEndpoints({
    addTagTypes: ['MovieTag'],
});
// Define a service using a base URL and expected endpoints
export const movieApi = movieTags.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * @GET all evaluations
         */
        moviesGetList: builder.query<Array<Movie>, void>({
            queryFn: async (_, { dispatch }) => {
                try {
                    const response = await fetch('http://localhost:3001/movies?_limit=50');

                    const data = await response.json() as Array<Movie>;

                    return { data };
                } catch (error: any) {
                    return { error };
                }
            },
        }),

        moviesGetListGender: builder.query<Array<string>, void>({
            queryFn: async (_, { }) => {
                try {
                    const response = await fetch('http://localhost:3001/genres');
                    const data = await response.json() as Array<string>;

                    return { data }
                } catch (error: any) {
                    return { error };
                }
            },
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
    useMoviesGetListQuery,
    useMoviesGetListGenderQuery
} = movieApi;