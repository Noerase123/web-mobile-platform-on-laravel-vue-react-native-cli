import React from 'react'
import { Image, ImageProps } from 'react-native';

export function PlayIcon(props: ImageProps): React.JSX.Element {
  return (
    <Image
      source={require('../../assets/playButton.png')}
      {...props}
    />
  )
}