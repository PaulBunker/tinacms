import { PMTestHarness } from '../../prosemirror-test-utils'
import { defaultSchema } from '../default-schema'
import { liftBlockquote } from './blockquote-commands'

let {
  forDoc,
  doc,
  p,
  orderedList,
  bulletList,
  text,
  blockquote,
} = new PMTestHarness(defaultSchema)

describe('liftBlockquote', () => {
  it('should do nothing to paragraph', () => {
    const content = p(text('one'))
    forDoc(doc(content))
      .withTextSelection(2, 4)
      .apply(liftBlockquote)
      .expect(doc(content))
  })

  it('should do nothing to ordered list', () => {
    const content = p(orderedList(text('one')))

    forDoc(doc(content))
      .withTextSelection(2, 5)
      .apply(liftBlockquote)
      .expect(doc(content))
  })

  it('should do nothing to bullet list', () => {
    const content = p(bulletList(text('one')))

    forDoc(doc(content))
      .withTextSelection(2, 5)
      .apply(liftBlockquote)
      .expect(doc(content))
  })

  it('should remove blockquotes', () => {
    const content = p(blockquote(text('one')))

    forDoc(doc(content))
      .withTextSelection(2, 5)
      .apply(liftBlockquote)
      .expect(doc(p(text('one'))))
  })
})