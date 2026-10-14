import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// locales
import { useLocales } from 'src/locales';
// components
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  dashboard: icon('dashboard'),
  students: icon('student'),
  pods: icon('pods'),
  curriculum: icon('curriculum'),
  quiz: icon('quiz'),
  submissions: icon('submissions'),
  settings: icon('settings'),
  exercise: icon('exercise'),
  progress: icon('progress'),
  file: icon('ic_file'),
  external: icon('ic_external'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const { t } = useLocales();

  const data = useMemo(
    () => [
      {
        items: [
          {
            title: t('Media'),
            path: paths.dashboard.documents,
            icon: ICONS.file,
          },
          {
            title: t('Settings'),
            path: paths.dashboard.settings,
            icon: ICONS.settings,
          },
          {
            title: t('Business Directory'),
            path: paths.home,
            icon: ICONS.external,
          },
        ],
      },
    ],
    [t]
  );

  return data;
}
