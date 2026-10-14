export const getFileIconConfig = (ext: string): { icon: string; bgcolor: string } => {
  const FILE_ICON_CONFIG: Record<string, { icon: string; bgcolor: string }> = {
    // Documents
    pdf: { icon: 'vscode-icons:file-type-pdf2', bgcolor: '#FF0000' },
    doc: { icon: 'vscode-icons:file-type-word', bgcolor: '#2B579A' },
    docx: { icon: 'vscode-icons:file-type-word', bgcolor: '#2B579A' },

    // Spreadsheets
    xls: { icon: 'vscode-icons:file-type-excel', bgcolor: '#217346' },
    xlsx: { icon: 'vscode-icons:file-type-excel', bgcolor: '#217346' },
    csv: { icon: 'vscode-icons:file-type-excel', bgcolor: '#217346' },

    // Presentations
    ppt: { icon: 'vscode-icons:file-type-powerpoint', bgcolor: '#D24726' },
    pptx: { icon: 'vscode-icons:file-type-powerpoint', bgcolor: '#D24726' },

    // Videos (fallback, shouldn't be used if preview works)
    mp4: { icon: 'mdi:file-video', bgcolor: '#9333EA' },
    webm: { icon: 'mdi:file-video', bgcolor: '#9333EA' },
    avi: { icon: 'mdi:file-video', bgcolor: '#9333EA' },
    mov: { icon: 'mdi:file-video', bgcolor: '#9333EA' },

    // Audio
    mp3: { icon: 'mdi:file-music', bgcolor: '#F59E0B' },
    wav: { icon: 'mdi:file-music', bgcolor: '#F59E0B' },
    ogg: { icon: 'mdi:file-music', bgcolor: '#F59E0B' },

    // Images (fallback, shouldn't be used if preview works)
    png: { icon: 'mdi:file-image', bgcolor: '#0EA5E9' },
    jpg: { icon: 'mdi:file-image', bgcolor: '#0EA5E9' },
    jpeg: { icon: 'mdi:file-image', bgcolor: '#0EA5E9' },
    gif: { icon: 'mdi:file-image', bgcolor: '#0EA5E9' },
    webp: { icon: 'mdi:file-image', bgcolor: '#0EA5E9' },
    svg: { icon: 'mdi:file-image', bgcolor: '#0EA5E9' },

    // Archives
    zip: { icon: 'mdi:folder-zip', bgcolor: '#78716C' },
    rar: { icon: 'mdi:folder-zip', bgcolor: '#78716C' },

    // Text
    txt: { icon: 'mdi:file-document', bgcolor: '#637381' },
  };

  return (
    FILE_ICON_CONFIG[ext] ?? {
      icon: 'mdi:file',
      bgcolor: '#637381',
    }
  );
};

export const getFileName = (url: string) => {
  try {
    const { pathname } = new URL(url);
    let name = decodeURIComponent(pathname.split('/').pop() ?? 'file');

    // remove trailing numbers like -123456789
    name = name.replace(/-\d+(?=\.)/, '');

    // replace remaining dashes with space
    name = name.replace(/-/g, ' ');
    return name;
  } catch {
    let name = decodeURIComponent(url.split('/').pop() ?? 'file');

    name = name.replace(/-\d+(?=\.)/, '');
    name = name.replace(/-/g, ' ');

    return name;
  }
};

export const getExtension = (url: string) => {
  try {
    const { pathname } = new URL(url);
    return pathname.split('.').pop()?.toLowerCase() ?? '';
  } catch {
    return url.split('.').pop()?.toLowerCase() ?? '';
  }
};

export const isMediaFile = (ext: string) => {
  const imageExts = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'];
  const videoExts = ['mp4', 'webm', 'avi', 'mov'];
  return imageExts.includes(ext) || videoExts.includes(ext);
};

export const isImageFile = (ext: string) => {
  const imageExts = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'];
  return imageExts.includes(ext);
};

export const isVideoFile = (ext: string) => {
  const videoExts = ['mp4', 'webm', 'avi', 'mov'];
  return videoExts.includes(ext);
};
