import CollectionQueryRes from '@api/interfaces/collectionQueryRes';
import resToWord from '@api/utils/resToWord';

import Collection from '@models/collection/interfaces/collection';

const resToCollection = (source: CollectionQueryRes): Collection => ({
  ...source,
  // eslint-disable-next-line no-underscore-dangle
  id: source._id,
  words: source.words?.map(resToWord),
  user: source.user && {
    ...source.user,
    // eslint-disable-next-line no-underscore-dangle
    id: source.user._id,
  },
});

export default resToCollection;
