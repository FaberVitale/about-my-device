import * as sapper from '@sapper/app';

const rootId = 'sapper';

const rootNode = document.getElementById(rootId);

if (rootNode) {
  sapper.start({
    target: rootNode,
  });
} else {
  console.error(`[boostrap][sapper]: couldn't locate root node "#${rootId}"`);
}
