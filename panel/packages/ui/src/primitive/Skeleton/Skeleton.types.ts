import type { ComponentProps } from "react";
import type { Skeleton as AntSkeleton } from "antd";

/** Skeleton composite props (AntD 5.7 baseline). */
export type SkeletonProps = ComponentProps<typeof AntSkeleton>;

/** Skeleton.Button props. */
export type SkeletonButtonProps = ComponentProps<typeof AntSkeleton.Button>;

/** Skeleton.Avatar props. */
export type SkeletonAvatarProps = ComponentProps<typeof AntSkeleton.Avatar>;

/** Skeleton.Input props. */
export type SkeletonInputProps = ComponentProps<typeof AntSkeleton.Input>;

/** Skeleton.Image props. */
export type SkeletonImageProps = ComponentProps<typeof AntSkeleton.Image>;

/** Skeleton.Node props. */
export type SkeletonNodeProps = ComponentProps<typeof AntSkeleton.Node>;
