import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Property } from '@/data/mockProperties';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square,
  Calendar,
  DollarSign,
  Building,
  Star,
  X
} from 'lucide-react';

interface PropertyDetailsModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
}

const PropertyDetailsModal = ({ property, isOpen, onClose }: PropertyDetailsModalProps) => {
  if (!property) return null;

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getPropertyTypeColor = (type: string) => {
    switch (type) {
      case 'apartment':
        return 'bg-info text-info-foreground';
      case 'house':
        return 'bg-success text-success-foreground';
      case 'commercial':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  const pricePerSqm = Math.round(property.price / property.area);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold">
                {property.title}
              </DialogTitle>
              <DialogDescription className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                {property.district}, {property.city}
              </DialogDescription>
            </div>
            <Badge className={getPropertyTypeColor(property.propertyType)}>
              {property.propertyType}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Property Image */}
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={property.imageUrl} 
              alt={property.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-background/90 text-foreground text-lg px-3 py-1">
                {formatPrice(property.price)}
              </Badge>
            </div>
          </div>

          {/* Key Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg border border-border">
              <Square className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-lg font-semibold">{property.area}m²</div>
              <div className="text-sm text-muted-foreground">Total Area</div>
            </div>
            
            {property.bedrooms && (
              <div className="text-center p-4 rounded-lg border border-border">
                <Bed className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-lg font-semibold">{property.bedrooms}</div>
                <div className="text-sm text-muted-foreground">Bedrooms</div>
              </div>
            )}
            
            {property.bathrooms && (
              <div className="text-center p-4 rounded-lg border border-border">
                <Bath className="w-6 h-6 mx-auto mb-2 text-primary" />
                <div className="text-lg font-semibold">{property.bathrooms}</div>
                <div className="text-sm text-muted-foreground">Bathrooms</div>
              </div>
            )}

            <div className="text-center p-4 rounded-lg border border-border">
              <DollarSign className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-lg font-semibold">${pricePerSqm}</div>
              <div className="text-sm text-muted-foreground">Per m²</div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {property.description}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Features</h3>
            <div className="flex flex-wrap gap-2">
              {property.features.map((feature, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Property Details</h3>
              <div className="space-y-2">
                {property.yearBuilt && (
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Year Built</span>
                    <span className="font-medium">{property.yearBuilt}</span>
                  </div>
                )}
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Property Type</span>
                  <span className="font-medium capitalize">{property.propertyType}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Listed Date</span>
                  <span className="font-medium">{formatDate(property.listedDate)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Location</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">City</span>
                  <span className="font-medium">{property.city}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">District</span>
                  <span className="font-medium">{property.district}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-muted-foreground">Coordinates</span>
                  <span className="font-medium text-sm">
                    {property.coordinates.lat.toFixed(4)}, {property.coordinates.lng.toFixed(4)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-border">
            <Button variant="analytics" className="flex-1">
              Contact Agent
            </Button>
            <Button variant="outline" className="flex-1">
              Save Property
            </Button>
            <Button variant="outline" className="flex-1">
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetailsModal;