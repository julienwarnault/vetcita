import usePageProps from './use_page_props'

export default function useSearchParams() {
  const { qs } = usePageProps()
  return qs || {}
}
