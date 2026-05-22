import type { ComponentProps } from "react";
import type { Upload as AntUpload } from "antd";

/** Liste görünüm tipi. */
export type UploadListType =
  | "text"
  | "picture"
  | "picture-card"
  | "picture-circle";

/** Upload status — her dosya için. */
export type UploadStatus = "uploading" | "done" | "error" | "removed" | "success";

/** ServiceCore Upload — AntD Upload 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   accept, action, beforeUpload, customRequest, data, headers, method,
 *   withCredentials, defaultFileList, fileList, directory, disabled,
 *   listType (picture-circle 5.2+ → 5.7'de var), maxCount (4.10+),
 *   multiple, name, openFileDialogOnClick, previewFile, progress,
 *   showUploadList (boolean), iconRender, itemRender (4.16+),
 *   isImageUrl,
 *   onChange, onPreview, onRemove, onDrop, onDownload
 *
 * 5.7'de YOK:
 *   showUploadList object form (showPreviewIcon/showRemoveIcon/
 *   showDownloadIcon function) (5.21+),
 *   pastable (5.25+),
 *   classNames/styles semantic DOM (6.0+).
 */
export type UploadProps = ComponentProps<typeof AntUpload>;

/** Upload.Dragger — drag & drop varyantı. */
export type UploadDraggerProps = ComponentProps<typeof AntUpload.Dragger>;
