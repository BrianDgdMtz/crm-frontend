import React, { useMemo } from 'react';
import { DragDropContext, Droppable, Draggable, type DropResult } from '@hello-pangea/dnd';
import { Box, Typography, Card, CardContent, Chip, Avatar, useTheme } from '@mui/material';
import { etapaDealsMock } from '../../mock/etapaDealsMock';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { toast } from 'sonner';

interface Deal {
  id: number;
  titulo: string;
  monto_estimado: number;
  etapa_id: number;
  nombreEmpresa: string;
  nombreEstado: string;
  prioridad: string;
}

interface DealsKanbanBoardProps {
  deals: Deal[];
  onDealMove: (dealId: number, nuevaEtapaId: number) => void;
  onSeleccionarDeal: (id: number) => void;
}

const getPrioridadColor = (prioridad: string) => {
  switch (prioridad) {
    case "Alta": return "error";
    case "Media": return "warning";
    case "Baja": return "info";
    default: return "default";
  }
};

const DealsKanbanBoard: React.FC<DealsKanbanBoardProps> = ({ deals, onDealMove, onSeleccionarDeal }) => {
  const theme = useTheme();

  // Agrupar deals por etapa
  const columns = useMemo(() => {
    return etapaDealsMock.map(etapa => ({
      ...etapa,
      items: deals.filter(d => d.etapa_id === etapa.id)
    }));
  }, [deals]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const sourceDroppableId = parseInt(result.source.droppableId);
    const destinationDroppableId = parseInt(result.destination.droppableId);

    if (sourceDroppableId !== destinationDroppableId) {
      const dealId = parseInt(result.draggableId);
      const deal = deals.find(d => d.id === dealId);
      const nuevaEtapa = etapaDealsMock.find(e => e.id === destinationDroppableId);
      onDealMove(dealId, destinationDroppableId);
      
      toast.success(`Deal movido a ${nuevaEtapa?.nombre}`, {
        description: deal?.titulo
      });
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Box sx={{ display: 'flex', gap: 3, overflowX: 'auto', pb: 2, minHeight: '60vh' }}>
        {columns.map((col) => (
          <Box key={col.id} sx={{ minWidth: 320, width: 320, display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ 
              p: 2, 
              mb: 2, 
              borderRadius: 2, 
              bgcolor: 'background.paper',
              borderTop: `4px solid ${theme.palette.primary.main}`,
              boxShadow: theme.shadows[1]
            }}>
              <Typography variant="h6" fontWeight={600} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                {col.nombre}
                <Chip size="small" label={col.items.length} />
              </Typography>
            </Box>

            <Droppable droppableId={col.id.toString()}>
              {(provided, snapshot) => (
                <Box
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  sx={{
                    flex: 1,
                    p: 1,
                    borderRadius: 2,
                    bgcolor: snapshot.isDraggingOver ? 'action.hover' : 'transparent',
                    transition: 'background-color 0.2s ease !important',
                    minHeight: 150
                  }}
                >
                  {col.items.map((deal, index) => (
                    <Draggable key={deal.id.toString()} draggableId={deal.id.toString()} index={index}>
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => onSeleccionarDeal(deal.id)}
                          sx={{
                            mb: 2,
                            cursor: 'grab',
                            transform: snapshot.isDragging ? 'rotate(3deg) scale(1.02)' : 'none',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease !important',
                            boxShadow: snapshot.isDragging ? theme.shadows[6] : theme.shadows[1],
                            '&:hover': { boxShadow: theme.shadows[4] }
                          }}
                        >
                          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                              <Chip 
                                size="small" 
                                label={deal.prioridad} 
                                color={getPrioridadColor(deal.prioridad) as any} 
                                variant="outlined" 
                                sx={{ height: 20, fontSize: '0.7rem' }} 
                              />
                            </Box>
                            <Typography variant="subtitle1" fontWeight={600} noWrap title={deal.titulo}>
                              {deal.titulo}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }} noWrap>
                              {deal.nombreEmpresa}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Typography variant="body2" fontWeight={600} color="primary.main" sx={{ display: 'flex', alignItems: 'center' }}>
                                <AttachMoneyIcon fontSize="small" sx={{ mr: 0.5 }} />
                                {deal.monto_estimado.toLocaleString()}
                              </Typography>
                              <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem', bgcolor: theme.palette.secondary.light }}>
                                {deal.nombreEmpresa.charAt(0)}
                              </Avatar>
                            </Box>
                          </CardContent>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Box>
        ))}
      </Box>
    </DragDropContext>
  );
};

export default DealsKanbanBoard;
