import { Button, Modal } from '../../../../components/ui'

interface ExamFinishModalProps {
  open: boolean
  answeredCount: number
  emptyCount: number
  markedCount: number
  onConfirm: () => void
  onCancel: () => void
}

export default function ExamFinishModal({
  open,
  answeredCount,
  emptyCount,
  markedCount,
  onConfirm,
  onCancel,
}: ExamFinishModalProps) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title="Sınavı Bitir"
      footer={
        <>
          <Button variant="outline" onClick={onCancel}>
            Vazgeç
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Sınavı Bitir
          </Button>
        </>
      }
    >
      <p>Sınavı bitirmek istediğinize emin misiniz?</p>
      <ul className="exam-finish-summary">
        <li>Cevaplanan: <strong>{answeredCount}</strong></li>
        <li>Boş: <strong>{emptyCount}</strong></li>
        <li>İşaretli: <strong>{markedCount}</strong></li>
      </ul>
    </Modal>
  )
}
