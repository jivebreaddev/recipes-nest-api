import { User } from "../entities/user.entity"

export const userStub(): User => {
    return {
        id: 4,
        username: "sdaflkjasd",
        password: "sadfasdfsad"
    };
}