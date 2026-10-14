'use client';

import { useRouter } from 'next/navigation';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
// routes
import { paths } from 'src/routes/paths';
import { useGetBusinesses } from 'src/api/business';
import { BUSINESS_CATEGORY_COLORS } from 'src/_mock/_business';
import PublicHeader from './public-header';

// ----------------------------------------------------------------------

export default function HomeView() {
  const router = useRouter();
  const { businesses, businessesLoading } = useGetBusinesses();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <PublicHeader />

      <Box
        sx={{
          py: { xs: 6, md: 10 },
          textAlign: 'center',
          background:
            'linear-gradient(135deg, rgba(100,191,184,0.12) 0%, rgba(100,191,184,0.03) 100%)',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{ mb: 2, color: 'text.primary', lineHeight: 1.2 }}
          >
            Discover Businesses & Chat with Their{' '}
            <Box component="span" sx={{ color: '#64BFB8' }}>
              AI Support
            </Box>
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520, mx: 'auto' }}>
            Browse the directory, open a business, and start an instant AI-powered conversation. No
            account needed.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Typography variant="h5" fontWeight={600} sx={{ mb: 3 }}>
          All Businesses
          {!businessesLoading && (
            <Typography
              component="span"
              variant="body2"
              color="text.secondary"
              sx={{ ml: 1.5, fontWeight: 400 }}
            >
              ({businesses.length} listed)
            </Typography>
          )}
        </Typography>

        <Grid container spacing={3}>
          {businessesLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <Grid key={index} xs={12} sm={6} md={4} lg={3}>
                  <Card sx={{ p: 2.5, borderRadius: 2, height: 220 }}>
                    <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                      <Skeleton variant="circular" width={48} height={48} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Skeleton width="70%" />
                        <Skeleton width="40%" />
                      </Box>
                    </Stack>
                    <Skeleton />
                    <Skeleton width="90%" />
                    <Skeleton width="50%" />
                  </Card>
                </Grid>
              ))
            : businesses.map((biz) => {
                const avatarColor = BUSINESS_CATEGORY_COLORS[biz.category] || '#64BFB8';
                return (
                  <Grid key={biz.id} xs={12} sm={6} md={4} lg={3}>
                    <Card
                      sx={{
                        height: '100%',
                        borderRadius: 2,
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                        },
                      }}
                    >
                      <CardActionArea
                        onClick={() => router.push(paths.business.detail(biz.id))}
                        sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'stretch',
                        }}
                      >
                        <CardContent sx={{ flexGrow: 1 }}>
                          <Stack direction="row" spacing={2} alignItems="flex-start" sx={{ mb: 2 }}>
                            <Avatar
                              sx={{
                                bgcolor: avatarColor,
                                width: 48,
                                height: 48,
                                fontSize: 16,
                                fontWeight: 700,
                                flexShrink: 0,
                              }}
                            >
                              {biz.avatar}
                            </Avatar>
                            <Box sx={{ minWidth: 0 }}>
                              <Typography variant="subtitle1" fontWeight={700} noWrap>
                                {biz.name}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{
                                  display: 'inline-block',
                                  px: 1,
                                  py: 0.25,
                                  borderRadius: 1,
                                  bgcolor: `${avatarColor}22`,
                                  color: avatarColor,
                                  fontWeight: 600,
                                }}
                              >
                                {biz.category}
                              </Typography>
                            </Box>
                          </Stack>

                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1.5, lineHeight: 1.6 }}
                          >
                            {biz.description}
                          </Typography>

                          {biz.location && (
                            <Typography variant="caption" color="text.disabled">
                              📍 {biz.location}
                            </Typography>
                          )}
                        </CardContent>

                        <Box
                          sx={{
                            px: 2,
                            py: 1.5,
                            borderTop: '1px solid',
                            borderColor: 'divider',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Typography variant="caption" color="text.secondary" fontWeight={500}>
                            Chat with AI →
                          </Typography>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: '#64BFB8',
                            }}
                          />
                        </Box>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
        </Grid>
      </Container>

      <Box
        sx={{
          py: 4,
          textAlign: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
          mt: 4,
        }}
      >
        <Typography variant="caption" color="text.disabled">
          © 2026 AI Customer Support. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
