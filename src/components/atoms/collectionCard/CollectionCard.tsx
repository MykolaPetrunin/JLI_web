import React, { FC, MouseEvent } from 'react';

import { Favorite, FavoriteBorder, LockPersonOutlined, ShareOutlined } from '@mui/icons-material';
import { Avatar, Card, CardActionArea, CardActions, CardHeader, IconButton } from '@mui/material';

import Collection from '@models/collection/interfaces/collection';

interface CollectionCardProps {
  source: Collection;
  onClick: (e: MouseEvent) => void;
  onLike?: (isLiked: boolean) => void;
  onShare?: () => void;
}

const CollectionCard: FC<CollectionCardProps> = ({ source, onLike, onClick, onShare }) => {
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardHeader
          title={source.name}
          subheader={`${source.wordsCount} слів`}
          action={source.isPrivate && <LockPersonOutlined />}
          avatar={
            source.user && (
              <Avatar src={source.user.picture}>{`${source.user.name.split(' ')[0][0]}${
                source.user.name.split(' ')[1][0]
              }`}</Avatar>
            )
          }
        />
      </CardActionArea>
      {(onLike || (onShare && navigator.share)) && (
        <CardActions>
          {onLike && (
            <IconButton onClick={() => onLike(!source.liked)}>
              {source.liked ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          )}
          {onShare && !!navigator.share && (
            <IconButton onClick={onShare}>
              <ShareOutlined />
            </IconButton>
          )}
        </CardActions>
      )}
    </Card>
  );
};

export default CollectionCard;
