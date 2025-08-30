// generate-schemas.ts
import fs from 'fs';

function parsePrismaSchema(schemaPath: string) {
  const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
  const models: { [key: string]: any } = {};

  // Parse các model từ schema.prisma
  const modelRegex = /model\s+(\w+)\s*{([^}]*)}/g;
  let match;
  while ((match = modelRegex.exec(schemaContent)) !== null) {
    const modelName = match[1];
    const fieldsContent = match[2];
    const properties: { [key: string]: any } = {};
    const required: string[] = [];

    // Parse các trường trong model
    const fieldRegex = /(\w+)\s+(\w+)(\??)/g;
    let fieldMatch;
    while ((fieldMatch = fieldRegex.exec(fieldsContent)) !== null) {
      const fieldName = fieldMatch[1];
      const fieldType = fieldMatch[2];
      const isOptional = fieldMatch[3] === '?';

      // Ánh xạ kiểu dữ liệu Prisma sang OpenAPI
      const typeMap: { [key: string]: any } = {
        Int: { type: 'integer', format: 'int32' },
        BigInt: { type: 'integer', format: 'int64' },
        Float: { type: 'number', format: 'float' },
        String: { type: 'string' },
        Boolean: { type: 'boolean' },
        DateTime: { type: 'string', format: 'date-time' },
      };

      // Kiểm tra kiểu mảng (array)
      if (fieldType.endsWith('[]')) {
        const itemType = fieldType.replace('[]', '');
        properties[fieldName] = {
          type: 'array',
          items: typeMap[itemType] || { type: 'object' },
        };
      } else {
        properties[fieldName] = typeMap[fieldType] || { type: 'object' };
      }

      if (!isOptional) {
        required.push(fieldName);
      }
    }

    models[modelName] = {
      type: 'object',
      properties,
      required: required.length > 0 ? required : undefined,
    };
  }

  return models;
}

const definitions = parsePrismaSchema('./prisma/schema.prisma');
fs.writeFileSync('./swagger-definitions.json', JSON.stringify(definitions, null, 2));
