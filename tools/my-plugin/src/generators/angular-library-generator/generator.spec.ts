import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { generateAngularLibraryGenerator } from './generator';
import { GenerateAngularLibraryGeneratorSchema } from './schema';

describe('generate-angular-application generator', () => {
  let tree: Tree;
  const options: GenerateAngularLibraryGeneratorSchema = {
    name: 'test',
    domain: 'finance',
    type: 'ui',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generateAngularLibraryGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });

  it('should ensure expected files exist after creation', async () => {
    await generateAngularLibraryGenerator(tree, options);

    const basePath = `libs/${options.domain}/${options.type}/${options.name}`;
    const expectedFiles = [
      `${basePath}/src/index.ts`,
      `${basePath}/README.md`,
      `${basePath}/project.json`,
      `${basePath}/package.json`,
    ];

    expectedFiles.forEach((file) => {
      expect(tree.exists(file)).toBe(true);
    });
  });
});
