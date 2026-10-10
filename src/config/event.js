/**
 * Current / upcoming event details.
 *
 * Kept in one place because the ticket link and dates are used by the hero CTA,
 * the home Upcoming Event section and the Third Chapter page.
 */

export const CHAPTER_THREE = {
  chapter: 'The Third Chapter',
  artist: 'Amrita Kaur',
  title: 'Amrita Kaur — Dusk to Dawn',
  dateShort: '11 Oct 2026',
  dateLong: 'Sun, 11 Oct 2026',
  city: 'Delhi',
  venue: 'New Delhi',
  path: '/third-chapter',
  // Both concerts now fall on 11 Oct — the evening show was rescheduled from
  // 10 Oct due to a planned protest near the venue (see notice to attendees).
  sunset:  { label: 'Dusk',  date: 'Sun, 11 Oct 2026', time: '7 PM – 10 PM' },
  sunrise: { label: 'Dawn', date: 'Sun, 11 Oct 2026', time: '7 AM – 10 AM' },
  ticketUrl:
    'https://www.district.in/events/amrita-kaur-dusk-to-dawn-songs-of-the-stone-2026-buy-tickets',
};
