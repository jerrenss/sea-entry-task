import { useRouter } from 'next/router'
import Event from '../../../src/views/Event'

export default function eventDetail() {
  const router = useRouter()
  return <Event id={String(router.query.event)} />
}
