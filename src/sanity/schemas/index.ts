import { localizedString, localizedText, localizedBlock } from './objects/localizedString'
import page from './page'
import event from './event'
import post from './post'
import activity from './activity'
import legalPage from './legalPage'
import teamMember from './teamMember'
import settings from './settings'
import formSubmission from './formSubmission'
import user from './user'
import resource from './resource'
import song from './song'
import photoGallery from './photoGallery'

export const schemaTypes = [
  // Objects
  localizedString,
  localizedText,
  localizedBlock,

  // Documents
  page,
  event,
  post,
  activity,
  legalPage,
  teamMember,
  settings,
  formSubmission,
  user,
  resource,
  song,
  photoGallery,
]
