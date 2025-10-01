import { test } from '../fixtures/auth'
import { DocumentsPage } from '../src/pages/DocumentsPage'
import { generateDocumentName, generateRoomName } from '../utils/dataGenerator';

test('creating a room for docx', async ({ page, adminAuth }) => {
  const fileName = generateDocumentName();
  const roomName = generateRoomName();

  const docs = new DocumentsPage(page);
  await docs.openDocumentsTab();
  await docs.createDocumentViaActions(fileName);
  await docs.openContextMenuForFile(fileName);
  await docs.createCustomRoomFromCurrentFile(fileName, roomName);

  await docs.assertRoomDetails(roomName, "Custom", "Files: 1");
  await docs.assertFileInRoom(fileName);
})