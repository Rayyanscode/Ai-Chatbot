'use client';

import { useRouter } from 'next/navigation';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
import { useGetBusiness } from 'src/api/business';
import { BUSINESS_CATEGORY_COLORS } from 'src/_mock/_business';
import PublicHeader from './public-header';
import ChatPopup from './chat-popup';

// ----------------------------------------------------------------------

type Props = {
  businessId: string;
};

export default function BusinessDetailView({ businessId }: Props) {
  const router = useRouter();
  const { business, businessLoading } = useGetBusiness(businessId);

  if (businessLoading) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <PublicHeader showBack />
        <Container maxWidth="lg" sx={{ py: 5 }}>
          <Card sx={{ borderRadius: 3, p: 4 }}>
            <Skeleton variant="rectangular" height={140} sx={{ mb: 3, borderRadius: 2 }} />
            <Skeleton variant="circular" width={80} height={80} sx={{ mb: 2 }} />
            <Skeleton width="40%" height={40} />
            <Skeleton sx={{ mt: 2 }} />
            <Skeleton width="90%" />
            <Skeleton width="70%" />
          </Card>
        </Container>
      </Box>
    );
  }

  if (!business) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <PublicHeader showBack />
        <Container maxWidth="md" sx={{ py: 10, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Business Not Found
          </Typography>
          <Button
            variant="contained"
            onClick={() => router.push(paths.home)}
            sx={{ bgcolor: '#64BFB8' }}
          >
            ← Back to Home
          </Button>
        </Container>
      </Box>
    );
  }

  const avatarColor = BUSINESS_CATEGORY_COLORS[business.category] || '#64BFB8';
  const contactItems = [
    business.email ? { label: 'Email', value: business.email } : null,
    business.phone ? { label: 'Phone', value: business.phone } : null,
    business.website ? { label: 'Website', value: business.website } : null,
    !business.email && !business.phone && business.contactInfo
      ? { label: 'Contact', value: business.contactInfo }
      : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <PublicHeader showBack />

      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Card sx={{ borderRadius: 3, overflow: 'hidden', mb: 4 }}>
          <Box
            sx={{
              height: 140,
              background: `linear-gradient(135deg, ${avatarColor}33 0%, ${avatarColor}11 100%)`,
            }}
          />

          <Box sx={{ px: { xs: 3, md: 5 }, pb: 4 }}>
            <Avatar
              sx={{
                bgcolor: avatarColor,
                width: 80,
                height: 80,
                fontSize: 24,
                fontWeight: 700,
                mt: -5,
                mb: 2,
                border: '4px solid',
                borderColor: 'background.paper',
              }}
            >
              {business.avatar}
            </Avatar>

            <Stack
              direction={{ xs: 'column', md: 'row' }}
              alignItems={{ xs: 'flex-start', md: 'center' }}
              justifyContent="space-between"
              spacing={2}
              sx={{ mb: 3 }}
            >
              <Box>
                <Typography variant="h4" fontWeight={700} sx={{ mb: 0.5 }}>
                  {business.name}
                </Typography>
                {business.location && (
                  <Typography variant="body2" color="text.secondary">
                    📍 {business.location}
                  </Typography>
                )}
              </Box>
              <Chip
                label={business.category}
                sx={{
                  bgcolor: `${avatarColor}22`,
                  color: avatarColor,
                  fontWeight: 600,
                  fontSize: 13,
                }}
              />
            </Stack>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.8 }}>
              {business.fullDescription || business.description}
            </Typography>

            {!!business.tags?.length && (
              <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 4 }}>
                {business.tags.map((tag) => (
                  <Chip key={tag} label={tag} size="small" variant="outlined" />
                ))}
              </Stack>
            )}

            {!!contactItems.length && (
              <>
                <Divider sx={{ mb: 3 }} />
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={3}
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  {contactItems.map((item) => (
                    <Box key={item.label}>
                      <Typography
                        variant="caption"
                        color="text.disabled"
                        sx={{ display: 'block', mb: 0.25 }}
                      >
                        {item.label}
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </>
            )}
          </Box>
        </Card>

        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          Have a question? Click the chat button in the bottom right to talk with the AI assistant.
        </Typography>
      </Container>

      <ChatPopup businessId={business.id} businessName={business.name} />
    </Box>
  );
}
