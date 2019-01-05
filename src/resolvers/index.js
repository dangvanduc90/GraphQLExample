import { Book } from './../connectors'

export const resolvers = {
    Query : {
        hello: () => Book.getBook(),
    },
};
