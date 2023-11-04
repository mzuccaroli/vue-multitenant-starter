export interface User {
  id: string;
  email: string;
  name: string;
}

export default {
  /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  deserialize(input: any): User {
    return {
      id: input.id || "",
      email: input.email || "",
      name: input.name || "",
    };
  },

  serialize(input: User): unknown {
    return {
      id: input.id,
      email: input.email,
      name: input.name,
    };
  },
};
