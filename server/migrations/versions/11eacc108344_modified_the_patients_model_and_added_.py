"""Modified the patients model and added the address field

Revision ID: 11eacc108344
Revises: 6803bd2b16dd
Create Date: 2024-02-08 15:03:23.856142

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '11eacc108344'
down_revision = '6803bd2b16dd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('patients', schema=None) as batch_op:
        batch_op.add_column(sa.Column('address', sa.String(), nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('patients', schema=None) as batch_op:
        batch_op.drop_column('address')

    # ### end Alembic commands ###
