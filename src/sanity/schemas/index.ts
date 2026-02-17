import { localizedString, localizedText, localizedBlock } from './objects/localizedString'
import page from './page'
import event from './event'
import post from './post'
import teamMember from './teamMember'
import settings from './settings'
import formSubmission from './formSubmission'

export const schemaTypes = [
  // Objects
  localizedString,
  localizedText,
  localizedBlock,

  // Documents
  page,
  event,
  post,
  teamMember,
  settings,
  formSubmission,
]
