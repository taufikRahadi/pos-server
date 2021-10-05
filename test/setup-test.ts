import { getConnection } from "typeorm"

beforeAll(async () => {
  const entities = getConnection().entityMetadatas
  for (const entity of entities) {
    const repository = getConnection().getRepository(entity.name)
    await repository.clear()
  }
})
